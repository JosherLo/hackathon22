import { Header } from "../../../components/displays/Header";
import React, { useEffect, useRef, useState } from "react";
import {
  AnswerDiv,
  AnswerHeader,
  AnswerSubmitDiv,
  Container,
  Content,
  MainContainer,
  Title,
  UpvoteContainer,
} from "./Question.styles";
import { useCookies } from "react-cookie";
import axios, { AxiosError } from "axios";
import { apiEndpoint } from "../../../utils/global-constants";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Tile } from "../../../components/displays/Tile";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "../../../components/input/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextFieldProps } from "@mui/material/TextField";
import { AnswerTile } from "../../../components/displays/AnswerTile";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Alert } from "@mui/material";

export default function Question() {
  const navigate = useNavigate();
  const { className, id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  let [username, password] = ["", ""];
  if (cookies.username && cookies.password) {
    [username, password] = [atob(cookies.username), atob(cookies.password)];
  }
  const [questionData, setQuestionData] = useState<any | undefined>(undefined);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [currentAlert, setCurrentAlert] = useState("none");
  const answerContent = useRef<TextFieldProps>(null);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}users/${username}/classes/${className}/questions`)
      .then((resp) => {
        console.log(resp.data.questions[id as string]);
        setQuestionData(resp.data.questions[id as string]);
      });
  }, []);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    } else {
      // lmao just trust the cookies bro :))))
    }
  }, [cookies]);

  useEffect(() => {
    // reorder solution to always be first
    console.log(questionData);
    if (!questionData || !questionData.answers) return;

    const tempAnswers = [...questionData.answers];
    if (questionData.solved)
      tempAnswers.unshift(tempAnswers.splice(questionData.solveAnswerId, 1)[0]);

    console.log(tempAnswers);
    setAnswers(tempAnswers);
  }, [questionData]);

  return (
    <Container>
      <Header
        title={"FORUM"}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username", { path: "/" });
          removeCookie("password", { path: "/" });
        }}
      />
      <MainContainer>
        {questionData && (
          <>
            <Title>
              <div>
                {questionData.type === "clarification"
                  ? "Question"
                  : "Challenge"}
                : {questionData.title}{" "}
                {questionData.type !== "clarification" &&
                  questionData.asker !== username &&
                  (questionData.solvers.includes(username) ? "???" : "???")}
              </div>
              <UpvoteContainer>
                <ArrowUpwardIcon
                  onClick={() => {
                    const userIndex = questionData.upVotes.indexOf(username);

                    if (userIndex === -1) {
                      axios
                        .post(
                          `${apiEndpoint}users/${username}/classes/${className}/questions/${id}/upvote`
                        )
                        .then((resp) => {
                          const tempQData = { ...questionData };
                          tempQData.upVotes = [...tempQData.upVotes];
                          tempQData.upVotes.push(username);
                          setQuestionData(tempQData);
                        });
                    } else {
                      axios
                        .delete(
                          `${apiEndpoint}users/${username}/classes/${className}/questions/${id}/upvote`
                        )
                        .then((resp) => {
                          const tempQData = { ...questionData };
                          tempQData.upVotes = [...tempQData.upVotes];
                          tempQData.upVotes.splice(userIndex, 1);
                          setQuestionData(tempQData);
                        });
                    }
                  }}
                  cursor={"pointer"}
                  htmlColor={
                    questionData.upVotes.includes(username)
                      ? "#FF8b60"
                      : "white"
                  }
                  fontSize={"inherit"}
                />
                {questionData.upVotes.length}
              </UpvoteContainer>
            </Title>
            <Content>
              <ReactMarkdown>{questionData.markdown}</ReactMarkdown>
            </Content>
            {questionData.type === "clarification" ? (
              <>
                <AnswerDiv>
                  <AnswerHeader>Answers</AnswerHeader>
                  {questionData.asker !== username && (
                    <AddIcon
                      cursor="pointer"
                      onClick={() => {
                        setOpenAnswerDialog(true);
                      }}
                    />
                  )}
                </AnswerDiv>
                {answers.length > 0 ? (
                  answers.map(({ user, answer }, index) => {
                    return (
                      <AnswerTile
                        key={`${user} ${answer}`}
                        person={user}
                        description={answer}
                        accepted={questionData.solved && index === 0}
                        showCheck={
                          questionData.asker === username &&
                          !questionData.solved
                        }
                        doOnAccept={() => {
                          axios
                            .post(
                              `${apiEndpoint}users/${username}/classes/${className}/questions/${id}/acceptAnswer`,
                              {
                                answerId: index,
                              }
                            )
                            .then(() => {
                              const tempQData = { ...questionData };
                              tempQData.solveAnswerId = index;
                              tempQData.solved = true;
                              setQuestionData(tempQData);
                            });
                        }}
                      />
                    );
                  })
                ) : (
                  <em>no answers :(</em>
                )}
              </>
            ) : (
              <>
                <em style={{ fontSize: "0.75em" }}>
                  solved by
                  {questionData.solvers.length > 0
                    ? ": " + questionData.solvers.join(", ")
                    : " no one"}
                </em>
                {questionData.asker !== username &&
                !questionData.solvers.includes(username) ? (
                  <>
                    <AnswerDiv>
                      <AnswerHeader>Submit an Answer</AnswerHeader>
                    </AnswerDiv>
                    <AnswerSubmitDiv>
                      <TextField
                        inputRef={answerContent}
                        fillWidth
                        placeholder={"enter answer..."}
                      />
                      <Button
                        onClick={() => {
                          const answer = answerContent.current!.value;
                          axios
                            .post(
                              `${apiEndpoint}users/${username}/classes/${className}/questions/${id}/solve`,
                              {
                                answer,
                              }
                            )
                            .then((resp) => {
                              setCurrentAlert("solve");
                              const tempQData = { ...questionData };
                              tempQData.solvers = [...tempQData.solvers];
                              tempQData.solvers.push(username);
                              setQuestionData(tempQData);
                              setTimeout(() => {
                                setCurrentAlert("none");
                              }, 2000);
                            })
                            .catch((err: AxiosError) => {
                              if (err.response?.status === 406) {
                                setCurrentAlert("wrong answer");
                                setTimeout(() => {
                                  setCurrentAlert("none");
                                }, 2000);
                              }
                            });
                        }}
                      >
                        Submit
                      </Button>
                    </AnswerSubmitDiv>
                  </>
                ) : (
                  <p>
                    Answer is <b>{questionData.answer}</b>
                  </p>
                )}
              </>
            )}
          </>
        )}
      </MainContainer>
      <Dialog
        open={openAnswerDialog}
        onClose={() => {
          setOpenAnswerDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Answer Question</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            inputRef={answerContent}
            fullWidth
            multiline
            placeholder={"type answer here..."}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const answer = answerContent.current!.value;
              axios
                .post(
                  `${apiEndpoint}users/${username}/classes/${className}/questions/${id}/answer`,
                  {
                    answer: answer,
                  }
                )
                .then((res) => {
                  setOpenAnswerDialog(false);
                  const tempQData = { ...questionData };
                  tempQData.answers = [...tempQData.answers];
                  tempQData.answers.push({ user: username, answer });
                  setQuestionData(tempQData);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            autoFocus
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              setOpenAnswerDialog(false);
            }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {currentAlert === "solve" && (
        <Alert sx={{ position: "fixed", bottom: "5px" }} severity={"success"}>
          Correct!
        </Alert>
      )}
      {currentAlert === "wrong answer" && (
        <Alert sx={{ position: "fixed", bottom: "5px" }} severity={"error"}>
          Wrong answer!
        </Alert>
      )}
    </Container>
  );
}

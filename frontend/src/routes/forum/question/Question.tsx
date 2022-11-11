import { Header } from "../../../components/displays/Header";
import React, { useEffect, useState, Fragment } from "react";
import {
  Container,
  MainContainer,
  Title,
  Content,
  AnswerHeader,
} from "./Question.styles";
import { useCookies } from "react-cookie";
import axios from "axios";
import { apiEndpoint } from "../../../utils/global-constants";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Tile } from "../../../components/displays/Tile";

export default function Question() {
  const { className, id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [username, password] = [atob(cookies.username), atob(cookies.password)];
  const [questionData, setQuestionData] = useState<any | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}users/${username}/classes/${className}/questions`)
      .then((resp) => {
        setQuestionData(resp.data.questions[id as string]);
      });
  }, []);

  return (
    <Container>
      <Header
        title={"FORUM"}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username");
          removeCookie("password");
        }}
      />
      <MainContainer>
        {questionData && (
          <>
            <Title>
              {questionData.type === "clarification" ? "Question" : "Challenge"}
              : {questionData.title}
            </Title>
            <Content>
              <ReactMarkdown>{questionData.markdown}</ReactMarkdown>
            </Content>
            {questionData.type === "clarification" ? (
              <>
                <AnswerHeader>Answers</AnswerHeader>
                {questionData.answers.length > 0 ? (
                  questionData.answers.map(({ user, answer }) => {
                    return (
                      <Tile
                        key={`${user} ${answer}`}
                        title={user}
                        description={answer}
                        people=""
                        link=""
                      />
                    );
                  })
                ) : (
                  <em>no answers :(</em>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </MainContainer>
    </Container>
  );
}

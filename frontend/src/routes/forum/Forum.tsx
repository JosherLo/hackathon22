import {
  AddContainer,
  Container,
  DropdownPanel,
  ForumContainer,
  MainContainer,
  SearchPanel,
  SelectionPanel,
  StyledSelect,
  TagsDiv,
} from "./Forum.styles";
import { Header } from "../../components/displays/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { apiEndpoint } from "../../utils/global-constants";
import { Chip, IconButton, InputAdornment, MenuItem } from "@mui/material";
import { TextField } from "../../components/input/TextField";
import { Tile } from "../../components/displays/Tile";
import AddIcon from "@mui/icons-material/Add";
import { CircleButton } from "../../components/input/CircleButton";
import { TextFieldProps } from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DateTime } from "luxon";

export const Forum = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    }
  }, [cookies]);

  const [modules, setModules] = React.useState<string[]>([]);
  const [selectedModule, setSelectedModule] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [fullQuestions, setFullQuestions] = React.useState<any[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentType, setCurrentType] = React.useState("");
  const [lastSelectedTag, setLastSelectedTag] =
    React.useState<string>("Tags...");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [allTags, setAllTags] = React.useState<string[]>([]);
  const newTag = React.useRef<TextFieldProps>();
  const questionTitle = React.useRef<TextFieldProps>();
  const questionMarkdown = React.useRef<TextFieldProps>();
  const questionAnswer = React.useRef<TextFieldProps>();

  let [username, password] = ["", ""];
  if (cookies.username && cookies.password) {
    [username, password] = [atob(cookies.username), atob(cookies.password)];
  }

  useEffect(() => {
    axios.get(`${apiEndpoint}users/${username}/classes/`).then((resp) => {
      setModules(resp.data.classes);
    });
  }, []);

  useEffect(() => {
    if (!selectedModule) return;
    axios
      .get(
        `${apiEndpoint}users/${username}/classes/${selectedModule}/questions`
      )
      .then((resp) => {
        setFullQuestions(resp.data.questions);
        const allTags: string[] = [];
        resp.data.questions.forEach((question: { tags: string[] }) => {
          allTags.push(...question.tags);
        });
        setAllTags(allTags);
      });
  }, [selectedModule]);

  useEffect(() => {
    if (!fullQuestions) return;
    const searchTerm = search.toLowerCase() || "";

    const filtered = fullQuestions.filter((question) => {
      return question.title.toLowerCase().includes(searchTerm);
    });
    filtered.map((qn, idx) => {
      qn.originalIndex = idx;
    });
    filtered.sort((a, b) => {
      return a.upVotes.length > b.upVotes.length ? -1 : 1;
    });

    setQuestions(filtered);
  }, [search, fullQuestions]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Header
        title={"FORUM"}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username", { path: "/" });
          removeCookie("password", { path: "/" });
          navigate("/");
        }}
      />
      <MainContainer>
        <SelectionPanel>
          <DropdownPanel>
            <StyledSelect
              SelectDisplayProps={{
                style: { paddingTop: 8, paddingBottom: 8 },
              }}
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value as string);
              }}
            >
              {modules.map((a) => (
                <MenuItem value={a}>{a}</MenuItem>
              ))}
            </StyledSelect>
          </DropdownPanel>
          {selectedModule && (
            <AddContainer>
              <CircleButton
                onClick={() => {
                  setOpenDialog(true);
                }}
                icon={<AddIcon sx={{ width: 25, height: 25 }} />}
              />
            </AddContainer>
          )}
          <SearchPanel>
            <TextField
              sx={{ width: 260 }}
              size={"small"}
              label={"Search"}
              variant={"filled"}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => {
                setSearch(e.target.value);
              }}
            />
          </SearchPanel>
        </SelectionPanel>
        <ForumContainer>
          {questions.map((question) => {
            return (
              <Tile
                key={question}
                upvote
                noUpvote={question.upVotes.length}
                tags={question.tags}
                title={question.title}
                people={question.asker}
                link={`/forum/post/${selectedModule}/${question.originalIndex}`}
              />
            );
          })}
        </ForumContainer>
      </MainContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New Question</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            {}
          </DialogContentText>
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={currentType}
            onChange={(e) => {
              setCurrentType(e.target.value.toLowerCase());
            }}
          >
            <MenuItem value={"Clarification"}>Clarification</MenuItem>
            <MenuItem value={"Challenge"}>Challenge</MenuItem>
          </StyledSelect>
          <TextField
            sx={{ width: 260 }}
            size={"small"}
            inputRef={questionTitle}
            placeholder={"Title"}
            variant={"filled"}
          />
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={lastSelectedTag}
            onChange={(e) => {
              setLastSelectedTag(e.target.value as string);
              if (!selectedTags.includes(e.target.value as string)) {
                setSelectedTags([...selectedTags, e.target.value as string]);
              }
            }}
          >
            {allTags.map((a) => (
              <MenuItem value={a}>{a}</MenuItem>
            ))}
          </StyledSelect>
          <TagsDiv>
            {selectedTags.map((tag, index) => {
              return (
                <Chip
                  label={tag}
                  key={tag}
                  onClick={() => {
                    const selectedTagsC = [...selectedTags];
                    selectedTagsC.splice(index, 1);
                    setSelectedTags(selectedTagsC);
                  }}
                />
              );
            })}
          </TagsDiv>
          <TextField
            inputRef={newTag}
            placeholder={"New tag"}
            variant={"filled"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      const newTagName = newTag.current!.value;
                      const allTagsC = [...allTags];
                      const selectedTagsC = [...selectedTags];
                      allTagsC.push(newTagName);
                      selectedTagsC.push(newTagName);
                      setAllTags(allTagsC);
                      setSelectedTags(selectedTagsC);
                    }}
                    edge="end"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 260 }}
          />
          <TextField
            sx={{ width: 260 }}
            multiline
            size={"small"}
            inputRef={questionMarkdown}
            placeholder={"Description"}
            variant={"filled"}
          />
          {currentType === "challenge" && (
            <TextField
              sx={{ width: 260 }}
              size={"small"}
              inputRef={questionAnswer}
              placeholder={"Answer"}
              variant={"filled"}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              axios
                .put(
                  `${apiEndpoint}users/${username}/classes/${selectedModule}/questions`,
                  {
                    tags: selectedTags,
                    title: questionTitle.current!.value,
                    markdown: questionMarkdown.current!.value,
                    type: currentType.toLowerCase(),
                    answer: questionAnswer.current?.value,
                  }
                )
                .then(() => {
                  let question = {
                    tags: selectedTags,
                    title: questionTitle.current!.value,
                    asker: username,
                    markdown: questionMarkdown.current!.value,
                    type: currentType,
                    created: DateTime.now().toISO(),
                    upVotes: [username],
                  };

                  if (currentType === "challenge") {
                    question = {
                      ...question,
                      answer: questionAnswer.current!.value,
                      solvers: [],
                    };
                  } else if (currentType === "clarification") {
                    question = {
                      ...question,
                      solved: false,
                      solveAnswerId: 0,
                      answers: [],
                    };
                  }

                  const fullQC = [...fullQuestions];
                  fullQC.push(question);
                  setFullQuestions(fullQC);
                  handleClose();
                });
            }}
            autoFocus
          >
            Ok
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

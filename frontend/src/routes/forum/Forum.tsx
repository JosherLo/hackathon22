import {
  AddContainer,
  Container,
  DropdownPanel,
  ForumContainer,
  MainContainer,
  SearchPanel,
  SelectionPanel,
  StyledSelect,
} from "./Forum.styles";
import { Header } from "../../components/displays/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { apiEndpoint } from "../../utils/global-constants";
import { MenuItem } from "@mui/material";
import { TextField } from "../../components/input/TextField";
import { Tile } from "../../components/displays/Tile";
import AddIcon from "@mui/icons-material/Add";
import { CircleButton } from "../../components/input/CircleButton";

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
    } else {
      axios.get(apiEndpoint + "classes").then((response) => {
        setModules(response.data.classes);
        updateForum().then();
      });
    }
  }, [cookies]);

  const [modules, setModules] = React.useState<string[]>([]);
  const [selectedModule, setSelectedModule] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [questions, setQuestions] = React.useState<any[]>([]);

  const [username, password] = [atob(cookies.username), atob(cookies.password)]

  useEffect(() => {
    axios.get(`${apiEndpoint}users/${username}/classes/`).then((resp) => {
      setModules(resp.data.classes)
    })
  }, [])

  useEffect(() => {
    axios.get(`${apiEndpoint}users/${username}/classes/${selectedModule}/questions`).then((resp) => {
      setQuestions(resp.data.questions)
    })
  }, [selectedModule])

  const updateForum = async () => {
    if (selectedModule != "") {
      const res = await axios.get(
        apiEndpoint + "classes/" + selectedModule + "/leaderboard"
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
          <AddContainer>
            <CircleButton icon={<AddIcon sx={{ width: 25, height: 25 }} />} />
          </AddContainer>
          <SearchPanel>
            <TextField
              sx={{ width: 260 }}
              size={"small"}
              onChange={handleChange}
              label={"Search"}
              variant={"filled"}
            />
          </SearchPanel>
        </SelectionPanel>
        <ForumContainer>
          {
            questions.map((question, index) => {
              return <Tile title={question.title} people={question.asker} link={`/forum/${selectedModule}/${index}`} />
                })
          }
        </ForumContainer>
      </MainContainer>
    </Container>
  );
};

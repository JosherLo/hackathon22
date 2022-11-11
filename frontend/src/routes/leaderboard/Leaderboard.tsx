import { Header } from "../../components/displays/Header";
import { Container, LeaderboardHeader, LeaderboardItem, LeaderboardList, MainContainer, } from "./Leaderboard.styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { apiEndpoint } from "../../utils/global-constants";
import { MenuItem } from "@mui/material";
import { StyledSelect } from "../notes/Notes.styles";

export const Leaderboard = () => {
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
  const [selectedModule, setSelectedModule] = React.useState<string | undefined>(undefined);
  const [data, setData] = React.useState<{name: string, notesScore: number, forumScore: number}[]>([]);

  useEffect(() => {
    axios.get(`${apiEndpoint}users/${atob(cookies.username)}/classes`).then((resp) => {
      setModules(resp.data.classes)
    })
  }, [])

  useEffect(() => {
    axios.get(`${apiEndpoint}users/${atob(cookies.username)}/classes/${selectedModule}/scores`).then((resp) => {
      const tempData = []
      for (const [k, v] of Object.entries(resp.data.data)) {
        tempData.push({
          name: k,
          notesScore: 100,
          forumScore: (v as {forumScore: number}).forumScore
        })
      }
      setData(tempData)
    })
  }, [selectedModule])

  return (
    <Container>
      <Header
        title={"LEADERBOARD"}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username");
          removeCookie("password");
        }}
      />
      <MainContainer>
        <StyledSelect
          SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
          value={selectedModule}
          onChange={(e) => {
            setSelectedModule(e.target.value as string);
          }}
        >
          {modules.map((a) => (
            <MenuItem value={a}>{a}</MenuItem>
          ))}
        </StyledSelect>
        {selectedModule && <LeaderboardList>
          <LeaderboardHeader />
          {data.map((item) => {
            return (
              <LeaderboardItem
                name={item.name}
                notesScore={item.notesScore}
                forumScore={item.forumScore}
              />
            );
          })}
        </LeaderboardList>}
      </MainContainer>
    </Container>
  );
};

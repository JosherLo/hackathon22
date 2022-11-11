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
    } else {
      axios.get(apiEndpoint + "classes").then((response) => {
        setModules(response.data.classes);
        updateLeaderboard().then();
      });
    }
  }, [cookies]);

  const [modules, setModules] = React.useState<string[]>([
    "CM4131",
    "BL4131",
    "MA4132",
    "PC4132",
  ]);
  const [selectedModule, setSelectedModule] = React.useState<string>("");

  const updateLeaderboard = async () => {
    if (selectedModule != "") {
      const res = await axios.get(
        apiEndpoint + "classes/" + selectedModule + "/leaderboard"
      );
    }
  };

  const data = [
    { name: "Anom", notesScore: 100, forumScore: 100 },
    { name: "Anom", notesScore: 200, forumScore: 100 },
    { name: "Anom", notesScore: 300, forumScore: 100 },
  ];

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
        <LeaderboardList>
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
        </LeaderboardList>
      </MainContainer>
    </Container>
  );
};

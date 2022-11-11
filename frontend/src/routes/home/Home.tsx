import { Container, IconsContainer, MainContainer, ProjectContainer } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/displays/Header";
import { ProjectTile } from "../../components/displays/ProjectTile";
import { UnderlineTitle } from "../../components/displays/UnderlineTitle";
import { MainPageIcons } from "../../components/displays/MainPageIcons";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Divider } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const Home = () => {

  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies([ "username", "password" ]);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if ( !cookies.username || !cookies.password ) {
      navigate("/");
    } else {
      // lmao just trust the cookies bro :))))
    }
  }, [ cookies ]);


  return (
    <Container>
      <Header title={"Flow"} name={atob(cookies.username)} logout={ () => {
        removeCookie("username");
        removeCookie("password");
      } }/>
      <MainContainer>
        <UnderlineTitle title={ "Projects" }/>
        <ProjectContainer>
          <ProjectTile title={"Title"} description={"Desc"} people={"(Ppl)"} link={"/"}/>
          <ProjectTile title={"Title"} description={"Desc"} people={"(Ppl)"} link={""}/>
          <ProjectTile title={"Title"} description={"Desc"} people={"(Ppl)"} link={""}/>
          <ProjectTile title={"Title"} description={"Desc"} people={"(Ppl)"} link={""}/>
        </ProjectContainer>
        <Divider/>
        <IconsContainer>
          <MainPageIcons icon={<ImportContactsIcon sx={{ width: 100, height: 100}}/>} title={"Notes"} link={"/notes"}/>
          <MainPageIcons icon={<PeopleIcon sx={{ width: 100, height: 100}}/>} title={"Collaboration"} link={"/collab"}/>
          <MainPageIcons icon={<AssignmentIcon sx={{ width: 100, height: 100}}/>} title={"Leaderboard"} link={"/leaderboard"}/>
        </IconsContainer>
      </MainContainer>
    </Container>
  );
}
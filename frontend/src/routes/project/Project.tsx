import { Container, Description, InfoCol, InfoRow, MainContainer, TimelineDiv, Title } from "./Project.styles";
import { Header } from "../../components/displays/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import {ProjectTable} from "../../components/displays/ProjectTable";
import { DateTime } from "luxon";
import { ProjectTimeline } from "../../components/displays/ProjectTimeline";
import { ProjectType } from "../../utils/global-constants";

export const ProjectsPage = () => {

  const navigate = useNavigate();
  const { className, id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [ project, setProject ] = useState<{ [key: string]: ProjectType } | null>(null);

  useEffect(() => {
    setProject({
      "HE Project": {
        class: "physics y4",
        people: ["a", "b", "c","d"],
        description: "This is a description of the project",
        deadlines: {
          "do chores": {
            deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
          },
          "do chores 1": {
            deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
          },
          "do chores 2": {
            deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
          },
        }
      }
    })
  }, []);

  const data = {
    "do chores": {
      deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
    },
    "do chores 1": {
      deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
    },
    "do chores 2": {
      deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: true, description: "wwpwpwpwpwpw"
    },
  }

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    }
  }, [cookies]);

  return (
    <Container>
      <Header name={cookies.username ? atob(cookies.username) : ""} logout={() => {
        removeCookie("username", { path: "/" });
        removeCookie("password", { path: "/" });
      }} title={"PROJECT"} />
      { project && <MainContainer>
        <InfoRow>
          <InfoCol>
            <Title>{ Object.entries(project)[0][0] }</Title>
            <Description>{ Object.entries(project)[0][1].description }</Description>
            <Description>{ `Class: ${Object.entries(project)[0][1].class}` }</Description>
            <Description>{ `Members: ${Object.entries(project)[0][1].people.join(", ")}` }</Description>
          </InfoCol>
          <TimelineDiv>
            <ProjectTimeline data={ Object.entries(project)[0][1].deadlines }/>
          </TimelineDiv>
        </InfoRow>
        <ProjectTable data={ Object.entries(project)[0][1].deadlines }/>
      </MainContainer> }
    </Container>
  );
}
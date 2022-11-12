import { Container, MainContainer } from "./Project.styles";
import { Header } from "../../components/displays/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import {ProjectTable} from "../../components/displays/ProjectTable";
import { DateTime } from "luxon";

export const ProjectsPage = () => {

  const navigate = useNavigate();
  const { className, id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);

  // const data = [
  //   {task: "do chores", deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false},
  //   {task: "do chores", deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: true}
  // ]

  const data = {
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
      <MainContainer>
        <ProjectTable data={data}/>
      </MainContainer>
    </Container>
  );
}
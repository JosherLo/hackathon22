import { Container, MainContainer } from "./Project.styles";
import { Header } from "../../components/displays/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Project = () => {

  const navigate = useNavigate();
  const { className, id } = useParams();
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

  return (
    <Container>
      <Header name={cookies.username ? atob(cookies.username) : ""} logout={() => {
        removeCookie("username", { path: "/" });
        removeCookie("password", { path: "/" });
      }} title={"PROJECT"} />
      <MainContainer>

      </MainContainer>
    </Container>
  );
}
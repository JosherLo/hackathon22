import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/displays/Header";
import { Container, MainContainer } from "./Notes.styles";

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
      <Header name={atob(cookies.username)} logout={ () => {
        removeCookie("username");
        removeCookie("password");
      } }/>
      <MainContainer>

      </MainContainer>
    </Container>
  );
}
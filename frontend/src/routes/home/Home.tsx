import { Container } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { ButtonProgress } from "../../components/input/ButtonProgress";

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
      <p>wow this works</p>
      <ButtonProgress onClick={ async () => {
        removeCookie("username");
        removeCookie("password");
      } } handleErr={ async ( err: any ) => {
        console.error("ERROR CREATING ACCOUNT");
        console.log(err);
      } } text="SIGN OUT" variant={ "contained" } sx={ { width: 360 } }/>
    </Container>
  );
}
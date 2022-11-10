import { Container } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { TextFieldProps } from "@mui/material";
import { useCookies } from "react-cookie";
import { checkUser, createUser } from "../../utils/utils";
import { ButtonProgress } from "../../components/input/ButtonProgress";

export const Home = () => {

  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies([ "username", "password" ]);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if ( !cookies.username || !cookies.password ) {
      navigate("/");
    } else {
      checkUser(atob(cookies.username), atob(cookies.password)).then(( res ) => {
        if ( !res ) {
          navigate("/");
        }
      });
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
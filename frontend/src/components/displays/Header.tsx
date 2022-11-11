import styled from "@emotion/styled";
import { ButtonProgress } from "../input/ButtonProgress";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';

type HeaderProps = {
  name: string,
  logout: Function,
};

export const Header = (props: HeaderProps) => {
  return (
    <Container>
      <LogoDiv>
        <Img src={"https://firebasestorage.googleapis.com/v0/b/online-games-8dbbb.appspot.com/o/photos%2Fplaceholder.jpg?alt=media"} alt={"Logo"}/>
      </LogoDiv>
      <Name>{props.name}</Name>
      <Img src={"https://firebasestorage.googleapis.com/v0/b/online-games-8dbbb.appspot.com/o/photos%2Fplaceholder.jpg?alt=media"} alt={"Pfp"}/>
      <LogoutIconStyled onClick={ async () => {
        await props.logout();
      } }/>
      <Spacer/>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #202020;
  justify-content: center;
  align-items: center;
`;

const Name = styled.p`
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 20px;
`;

const LogoDiv = styled.div`
  flex: 1;
`;

const Spacer = styled.div`
  width: 20px;
`;

const LogoutIconStyled = styled(LogoutIcon)`
  &:hover {
    cursor: pointer;
  }
`;
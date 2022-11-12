import styled from "@emotion/styled";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import logoHexagon from "../../assets/logoHexagon.svg";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  logoText?: boolean;
  name: string;
  logout: Function;
  title: string;
};

export const Header = (props: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoDiv
        onClick={() => {
          navigate("/home");
        }}
      >
        <LogoImg src={props.logoText ? logo : logoHexagon} alt={"Logo"} />
      </LogoDiv>
      <Title>{props.title}</Title>
      <Name>{props.name}</Name>
      <Img
        src={
          "https://firebasestorage.googleapis.com/v0/b/online-games-8dbbb.appspot.com/o/photos%2Fplaceholder.jpg?alt=media"
        }
        alt={"Pfp"}
      />
      <LogoutIconStyled
        onClick={async () => {
          await props.logout();
        }}
      />
      <Spacer />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #202020;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Name = styled.p``;

const Title = styled.p`
  flex: 1;
  text-align: left;
  font-size: 20px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 20px;
`;

const LogoDiv = styled.div`
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 100%;
`;

const Spacer = styled.div`
  width: 20px;
`;

const LogoutIconStyled = styled(LogoutIcon)`
  &:hover {
    cursor: pointer;
  }
`;

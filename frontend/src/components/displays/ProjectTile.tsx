import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type ProjectTileProps = {
  title: string,
  description: string,
  people: string,
  link: string,
}

export const ProjectTile = (props: ProjectTileProps) => {
  return (
    <Container>
      <TitleDiv>
        <Title to={props.link}>{props.title}</Title>
        <People>{props.people}</People>
      </TitleDiv>
      <Description>{props.description}</Description>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100vw - 138px);
  height: 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #5f5f5f;
  border-radius: 15px;
  padding: 10px 20px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Title = styled(Link)`
  font-size: 24px;
  position: relative;
  cursor: pointer;
  color: white;
  text-decoration: none;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  };
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const Description = styled.p`
  font-size: 14px;
`;

const People = styled.p`
  font-size: 16px;
`;
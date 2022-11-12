import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

type ProjectTileProps = {
  title: string;
  description?: string;
  people: string;
  link: string;
  tags?: string[];
  upvote?: boolean;
  noUpvote?: number;
};

export const Tile = (props: ProjectTileProps) => {
  const tags = props.tags || [];

  return (
    <Container showDescription={!!props.description}>
      <TitleDiv>
        {props.upvote && (
          <UpvoteDiv>
            <ArrowUpwardIcon fontSize="inherit" htmlColor={"#FF8b60"} />
            <p>{props.noUpvote}</p>
          </UpvoteDiv>
        )}
        <Title to={props.link}>
          <p>{props.title}</p>
        </Title>
        {tags.map((tag) => {
          return <Chip key={tag} label={tag} />;
        })}
        <People>{props.people}</People>
      </TitleDiv>
        {props.description && <Description>{props.description}</Description>}
    </Container>
  );
};

const UpvoteDiv = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{ showDescription: boolean }>`
  width: calc(100vw - 138px);
  height: ${(p) => (p.showDescription ? "80px" : "40px")};
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
  gap: 5px;
  align-items: center;
`;

const Title = styled(Link)`
  font-size: 24px;
  display: flex;
  position: relative;
  cursor: pointer;
  color: white;
  text-decoration: none;
  white-space: nowrap;
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
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  text {
    max-width: 100%;
  }
`;

const Description = styled.p`
  font-size: 14px;
`;

const People = styled.p`
  font-size: 16px;
  white-space: nowrap;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

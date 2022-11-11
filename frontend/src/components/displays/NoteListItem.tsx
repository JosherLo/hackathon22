import styled from "@emotion/styled";
import { Chip } from "@mui/material";

type NoteProps = {
  name: string,
  tags: string[],
  onClick: Function,
}

export const NoteListItem = (props: NoteProps) => {

  const chips = [];

  for (let tag of props.tags) {
    chips.push(
      <Chip label={tag} />
    );
  }

  return (
    <Container onClick={() => props.onClick()}>
      <Title>{props.name}</Title>
      <Description>{chips}</Description>
    </Container>
  );
}

const Container = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  background-color: #5f5f5f;
  border-radius: 15px;
  margin: 2px 10px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 20px;
  position: relative;
  margin: 10px 0 0 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0 5px 10px;
  gap: 4px;
`;
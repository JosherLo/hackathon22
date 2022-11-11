import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

type NoteProps = {
  name: string;
  tags: string[];
  onClick: Function;
  delete: Function;
  upvotes: number;
};

export const NoteListItem = (props: NoteProps) => {
  const chips = [];

  for (let tag of props.tags) {
    chips.push(<Chip label={tag} />);
  }

  return (
    <Container onClick={() => props.onClick()}>
      <Title>{props.name}</Title>
      <Description>{chips}</Description>
      <DeleteIcon onClick={() => props.delete()} sx={{ size: "small" }} />
      <Upvotes>
        {props.upvotes}
        <ArrowUpwardIcon
          sx={{ marginTop: "1px" }}
          htmlColor="#FF8b60"
          fontSize="1em"
        ></ArrowUpwardIcon>
      </Upvotes>
    </Container>
  );
};

const DeleteIcon = styled(DeleteForeverIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Container = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: #5f5f5f;
  border-radius: 15px;
  margin: 2px 10px;
  cursor: pointer;
  position: relative;
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
  flex-wrap: wrap;
`;

const Upvotes = styled.p`
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

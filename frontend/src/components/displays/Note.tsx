import styled from "@emotion/styled";

type NoteProps = {
  title: string,
  name: string,
}

export const Note = (props: NoteProps) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Description>{`By: ${props.name}`}</Description>
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

const Title = styled.p`
  font-size: 20px;
  position: relative;
  cursor: pointer;
`;

const Description = styled.p`
  font-size: 14px;
`;
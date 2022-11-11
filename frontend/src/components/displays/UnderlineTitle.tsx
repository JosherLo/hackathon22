import styled from "@emotion/styled";

type UnderlineTitleProps = {
  title: string;
};

export const UnderlineTitle = (props: UnderlineTitleProps) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Underline />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 24px;
  margin: 5px 10px;
`;

const Underline = styled.div`
  height: 5px;
  width: 100%;
  background-color: #6d8b9b;
`;

import styled from "@emotion/styled";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const MainContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  margin: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 2em;
`;

const AnswerHeader = styled.div`
  font-size: 1.5em;
`;

const Content = styled.div`
  width: 80vw;
  padding: 20px;
  border: 3px solid #6d8b9b;
  border-radius: 5px;
`;

export { Container, MainContainer, Title, Content, AnswerHeader };

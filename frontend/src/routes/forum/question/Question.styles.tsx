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
  height: calc(100vh - 120px);
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
`;

const UpvoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const AnswerHeader = styled.div`
  font-size: 1.5em;
`;

const AnswerDiv = styled.div`
  width: 80vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 80vw;
  padding: 20px;
  border: 3px solid #6d8b9b;
  border-radius: 5px;
`;

const AnswerSubmitDiv = styled.div`
  display: flex;
  width: 80vw;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export {
  Container,
  MainContainer,
  Title,
  Content,
  AnswerHeader,
  AnswerDiv,
  UpvoteContainer,
  AnswerSubmitDiv,
};

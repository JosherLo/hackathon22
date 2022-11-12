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
  //align-items: center;
  gap: 20px;
`;

const Title = styled.p`

`;

export {
  Container,
  MainContainer,
}
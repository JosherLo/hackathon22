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
  margin: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ProjectContainer = styled.div`
  width: calc(100vw - 80px);
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  overflow-x: clip;
`;

const IconsContainer = styled.div`
  border-top: 3px solid #6d8b9b;
  padding-top: 50px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

export { Container, MainContainer, ProjectContainer, IconsContainer };

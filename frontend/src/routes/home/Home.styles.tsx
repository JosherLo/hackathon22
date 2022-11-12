import styled from "@emotion/styled";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow-x: hidden;
`;

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  top: 100px;
  z-index: 1;
  overflow-x: hidden;
`;

const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
  gap: 60px;
`;

export {
  Container,
  MainContainer,
  ProjectContainer,
  IconsContainer,
  TitleContainer,
};

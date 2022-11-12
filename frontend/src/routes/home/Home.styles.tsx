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
  flex-direction: row;
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

const TagsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 7px;
  width: 300px;
  align-items: center;
  justify-content: center;
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

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 30px;
`;

export {
  Container,
  MainContainer,
  ProjectContainer,
  IconsContainer,
  TitleContainer,
  TagsDiv,
  AddContainer,
};

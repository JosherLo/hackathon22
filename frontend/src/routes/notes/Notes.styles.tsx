import styled from "@emotion/styled";
import { Select } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

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
  position: fixed;
`;

const Panel = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 60px;
  left: 0;
  border: 1px solid black;
  height: calc(100vh - 60px);
`;

const StyledSelect = styled(Select)`
  margin: 2px 10px;
`;

const CodeEditorStyled = styled(MDEditor)`
  width: calc(100vw - 280px);
  position: fixed;
  height: calc(100vh - 60px);
  overflow: scroll;
`;

const Tag = styled.p`
  font-size: 12px;
  padding: 2px 5px;
  background-color: #5f5f5f;
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

const EditorDiv = styled.div`
  width: calc(100vw - 280px);
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 0;
  right: 0;
`;

export {
  Container,
  MainContainer,
  Panel,
  StyledSelect,
  CodeEditorStyled,
  Tag,
  TagsDiv,
  EditorDiv,
};
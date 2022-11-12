import styled from "@emotion/styled";
import Select from "@mui/material/Select";
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
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 80px;
  left: 0;
  border: 1px solid black;
  height: calc(100vh - 80px);
  align-items: center;
  padding: 10px;
`;

const StyledSelect = styled(Select)`
  margin: 0 10px;
  width: 260px;
`;

const CodeEditorStyled = styled(MDEditor)`
  width: calc(100vw - 280px);
  position: fixed;
  height: 100%;
  overflow: scroll;
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
  height: calc(100vh - 80px);
  position: fixed;
  bottom: 0;
  right: 0;
`;

const NoteItemList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 4px;
  //justify-content: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: clip;
  width: 260px;
  padding: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px 20px 10px 20px;
`;

const Title = styled.p`
  font-size: 20px;
  flex: 1;
`;

export {
  Container,
  MainContainer,
  Panel,
  StyledSelect,
  CodeEditorStyled,
  TagsDiv,
  EditorDiv,
  NoteItemList,
  InfoRow,
  Title,
};

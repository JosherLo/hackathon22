import styled from "@emotion/styled";
import Select from "@mui/material/Select";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const MainContainer = styled.div`
  width: 100vw;
  //margin: 60px 0 0 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: absolute;
`;

const TopPanel = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectionPanel = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border-bottom: 3px solid #6d8b9b;
  position: fixed;
`;

const TagsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 10px;
  row-gap: 7px;
  width: 300px;
  align-items: center;
  justify-content: center;
`;

const DropdownPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: left;
`;

const StyledSelect = styled(Select)`
  margin: 0 10px;
  width: 260px;
`;

const SearchPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: right;
`;

const ForumContainer = styled.div`
  width: calc(100vw - 80px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  overflow-x: clip;
  top: 100px;
  position: absolute;
  height: calc(100vh - 100px - 80px);
`;

export {
  Container,
  MainContainer,
  AddContainer,
  SelectionPanel,
  DropdownPanel,
  StyledSelect,
  SearchPanel,
  ForumContainer,
  TagsDiv,
};

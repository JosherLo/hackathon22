import styled from "@emotion/styled";
import Select from "@mui/material/Select";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
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

const SelectionPanel = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border-bottom: 3px solid #646464;
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
`;

export {
  Container,
  MainContainer,
  SelectionPanel,
  DropdownPanel,
  StyledSelect,
  SearchPanel,
  ForumContainer
};
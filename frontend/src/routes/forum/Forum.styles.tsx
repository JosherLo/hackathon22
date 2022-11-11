import styled from "@emotion/styled";

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
  width: 80vw;
  margin: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  gap: 20px;
  position: fixed;
`;

const SelectionPanel = styled.div`
  width: 80%;
`;

const DropdownPanel = styled.div`
  justify-content: left;
`;

const SearchPanel = styled.div`
  justify-content: right;
`;

export {
  Container,
  MainContainer,
  SelectionPanel,
  DropdownPanel,
  SearchPanel
};
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
  align-items: center;
  gap: 20px;
  overflow-x: hidden;
`;

const InfoRow = styled.div`
  width: calc(100vw - 80px);
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 20px 0 20px;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  margin: 20px 0 0 20px;
`;

const TimelineDiv = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 36px;
`;

const Description = styled.p`
  font-size: 18px;
`;

export {
  Container,
  MainContainer,
  InfoRow,
  InfoCol,
  Title,
  Description,
  TimelineDiv,
}
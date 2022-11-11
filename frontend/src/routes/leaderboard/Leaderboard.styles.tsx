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

const LeaderboardHeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 3px solid #646464;
  display: flex;
  flex-direction: row;
`;

type TextProps = {
  flex: number;
  align: string;
};

const LeaderboardText = styled.p`
  flex: ${(props: TextProps) => props.flex};
  text-align: ${(props: TextProps) => props.align};
`;

const LeaderboardHeader = () => {
  return (
    <LeaderboardHeaderContainer>
      <LeaderboardText flex={4} align={"left"}>
        Name
      </LeaderboardText>
      <LeaderboardText flex={2} align={"right"}>
        Notes Score
      </LeaderboardText>
      <LeaderboardText flex={2} align={"right"}>
        Forum Score
      </LeaderboardText>
      <LeaderboardText flex={2} align={"right"}>
        Total Score
      </LeaderboardText>
    </LeaderboardHeaderContainer>
  );
};

const LeaderboardItemContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

type ItemProps = {
  name: string;
  notesScore: number;
  forumScore: number;
};

const LeaderboardItem = (props: ItemProps) => {
  return (
    <LeaderboardItemContainer>
      <LeaderboardText flex={4} align={"left"}>
        {props.name}
      </LeaderboardText>
      <LeaderboardText flex={2} align={"right"}>
        {props.notesScore}
      </LeaderboardText>
      <LeaderboardText flex={2} align={"right"}>
        {props.forumScore}
      </LeaderboardText>
      <LeaderboardText flex={2} align={"right"}>
        {props.notesScore + props.forumScore}
      </LeaderboardText>
    </LeaderboardItemContainer>
  );
};

const LeaderboardList = styled.table`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px 40px;
  width: 100%;
  border: 3px solid #646464;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export {
  Container,
  MainContainer,
  LeaderboardHeader,
  LeaderboardItem,
  LeaderboardList,
};

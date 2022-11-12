import styled from "@emotion/styled";
import luxon, {DateTime} from 'luxon';
import {Checkbox, Table, Tooltip} from "@mui/material";
import { ProjectTimelineDeadline } from "../../utils/global-constants";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MainContainer = styled.div`
  width: 90vw;
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 3px solid #6d8b9b;
  display: flex;
  flex-direction: row;
  
`;

type TextProps = {
  flex: number,
  align: string,
};

const Text = styled.p`
  flex: ${(props: TextProps) => props.flex};
  text-align: ${(props: TextProps) => props.align};
`;

type TooltipProps = {
  flex: number
}

const TooltipContainer = styled(Tooltip)`
  flex: ${(props: TooltipProps) => props.flex};
`;

type CheckboxProps = {
  flex: number
};

const CheckboxContainer = styled.div`
  flex: ${(props: CheckboxProps) => props.flex};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableHeader = () => {
  return (
    <HeaderContainer>
      <Text flex={4} align={"left"}>
        Name
      </Text>
      <Text flex={2} align={"left"}>
        Deadline
      </Text>
      <Text flex={2} align={"right"}>
        People
      </Text>
      <Text flex={1} align={"center"}>
        Done
      </Text>
    </HeaderContainer>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type ItemProps = {
  task: string,
  deadline: luxon.DateTime,
  description: string,
  people: string[],
  completed: boolean
}

const TableItem = (props: ItemProps) => {
  return (
    <ItemContainer>
      <TooltipContainer flex={4} title={props.description} placement={"bottom-start"}>
        <Text flex={4} align={"left"}>
          {props.task}
        </Text>
      </TooltipContainer>
      <Text flex={2} align={"left"}>
        {props.deadline.toLocaleString(DateTime.DATETIME_MED)}
      </Text>
      <Text flex={2} align={"right"}>
        {props.people.join(", ")}
      </Text>
      <CheckboxContainer flex={1}>
        <Checkbox checked={props.completed}/>
      </CheckboxContainer>
    </ItemContainer>
  );
};

type ProjectTableProps = {
  data: {[key: string]: ProjectTimelineDeadline}
};

export const ProjectTable = (props: ProjectTableProps) => {
  return (
    <Container>
      <MainContainer>
        <TableHeader/>
        {
          Object.entries(props.data).map(([key, val]) => {
            return(
              <TableItem task={key} deadline={val.deadline} people={val.people} completed={val.completed} description={val.description}/>
            )
          })
        }
      </MainContainer>
    </Container>
  )
};

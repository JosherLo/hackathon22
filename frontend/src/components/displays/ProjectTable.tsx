import styled from "@emotion/styled";
import luxon, {DateTime} from 'luxon';
import {Checkbox, Table, Tooltip} from "@mui/material";
import { ProjectTimelineDeadline } from "../../utils/global-constants";
import { useState } from "react";

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
  deadline: string,
  description: string,
  people: string[],
  completed: boolean,
  onChecked: Function,
}

const TableItem = (props: ItemProps) => {

  const [ checked, setChecked ] = useState(props.completed);

  // @ts-ignore
  return (
    <ItemContainer>
      <TooltipContainer flex={4} title={props.description} placement={"bottom-start"}>
        <Text flex={4} align={"left"}>
          {props.task}
        </Text>
      </TooltipContainer>
      <Text flex={2} align={"left"}>
        {DateTime.fromISO(props.deadline).toLocaleString(DateTime.DATETIME_MED)}
      </Text>
      <Text flex={2} align={"right"}>
        {props.people.join(", ")}
      </Text>
      <CheckboxContainer flex={1}>
        <Checkbox checked={checked} onChange={(e) => {
          setChecked(true);
          props.onChecked(true);
        }}/>
      </CheckboxContainer>
    </ItemContainer>
  );
};

type ProjectTableProps = {
  data: {[key: string]: ProjectTimelineDeadline},
  onChecked: Function,
};

export const ProjectTable = (props: ProjectTableProps) => {
  return (
    <Container>
      <MainContainer>
        <TableHeader/>
        {
          Object.entries(props.data).map(([key, val]) => {
            return(
              <TableItem onChecked={(c: boolean) => {
                props.onChecked(c, key);
              }} task={key} deadline={val.deadline} people={val.people} completed={val.completed} description={val.description}/>
            )
          })
        }
      </MainContainer>
    </Container>
  )
};

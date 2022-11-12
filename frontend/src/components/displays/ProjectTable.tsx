import styled from "@emotion/styled";
import luxon from 'luxon';
import {Checkbox, Table} from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MainContainer = styled.div`
  width: 80vw;
  margin: 80px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 3px solid #6d8b9b;
  display: flex;
  flex-direction: row;
`;

type TextProps = {
  flex: number;
  align: string;
};

const Text = styled.p`
  flex: ${(props: TextProps) => props.flex};
  text-align: ${(props: TextProps) => props.align};
`;

type CheckboxProps = {
  flex: number;
};

const CheckboxContainer = styled(Checkbox)`
  flex: ${(props: CheckboxProps) => props.flex};
  align-items: center;
  justify-content: center;
`;

const TableHeader = () => {
  return (
    <HeaderContainer>
      <Text flex={4} align={"left"}>
        Name
      </Text>
      <Text flex={2} align={"right"}>
        Deadline
      </Text>
      <Text flex={4} align={"right"}>
        People
      </Text>
      <Text flex={1} align={"right"}>
        Done
      </Text>
    </HeaderContainer>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
`;



const TableItem = (props: ItemProps) => {
  return (
    <ItemContainer>
      <Text flex={4} align={"left"}>
        {props.task}
      </Text>
      <Text flex={2} align={"right"}>
        {props.deadline.toISO()}
      </Text>
      <Text flex={2} align={"right"}>
        {props.people.join(", ")}
      </Text>
      <CheckboxContainer flex={1} checked={props.completed}/>
    </ItemContainer>
  );
};

type ItemProps = {
  task: string,
  description: string,
  deadline: luxon.DateTime,
  people: string[],
  completed: boolean
};

export const ProjectTable = (props: {items: ItemProps[]}) => {
  return (
    <Container>
      <TableHeader/>
      {
        props.items.map((item) => {
          return(
            <TableItem task={item.task} deadline={item.deadline} people={item.people} completed={item.completed}/>
          )
        })
      }
    </Container>
  )
};

import { ReactComponentElement, ReactElement } from "react";
import styled from "@emotion/styled";
import { UnderlineTitle } from "./UnderlineTitle";
import { useNavigate } from "react-router-dom";

type MainPageIconsProps = {
  icon: ReactElement;
  title: string;
  link?: string;
  onClick?: Function;
};

export const MainPageIcons = (props: MainPageIconsProps) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        if (props.link) {
          navigate(props.link);
        } else {
          props.onClick!();
        }
      }}
    >
      <UnderlineTitle title={props.title} />
      {props.icon}
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 2px white solid;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #585757;
  }
`;

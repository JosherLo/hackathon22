import {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {UnderlineTitle} from "../displays/UnderlineTitle";
import styled from "@emotion/styled";

type CircleButtonProps = {
  icon: ReactElement;
  link?: string;
  onClick?: Function;
};

export const CircleButton = (props: CircleButtonProps) => {
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
      {props.icon}
    </Container>
  );
};

const Container = styled.div`
  width: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 2px white solid;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #585757;
  }
`;
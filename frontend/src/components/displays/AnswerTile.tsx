import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";

type AnswerTileProps = {
  person: string;
  description: string;
  accepted?: boolean;
  doOnAccept: () => void;
  showCheck: boolean;
};

export const AnswerTile = (props: AnswerTileProps) => {
  return (
    <Container accepted={props.accepted}>
      <TitleDiv>
        <Title>{props.person}</Title>
        {props.showCheck && (
          <People>
            <CheckIcon cursor={"pointer"} onClick={props.doOnAccept} />
          </People>
        )}
      </TitleDiv>
      <Description>"{props.description}"</Description>
    </Container>
  );
};

const Container = styled.div<{ accepted?: boolean }>`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${(props) => (props.accepted ? "83f28f" : "#5f5f5f")};
  border-radius: 15px;
  padding: 10px 20px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  display: flex;
  position: relative;
  cursor: pointer;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const Description = styled.p`
  font-size: 14px;
`;

const People = styled.p`
  font-size: 16px;
  white-space: nowrap;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

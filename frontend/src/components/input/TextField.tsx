import { default as tf } from "@mui/material/TextField";
import styled from "@emotion/styled";

export const TextField = (props: any) => {
  return <StyledTF {...props} />;
};

const StyledTF = styled(tf)`
  & label {
    font-family: Roboto;
    font-weight: 500;
    letter-spacing: 1.25px;
  }
`;

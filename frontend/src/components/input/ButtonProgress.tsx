import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";
import styled from "@emotion/styled";

export const ButtonProgress = ( props: any ) => {
  const [ status, setStatus ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  const handleClick = ( e: React.MouseEvent ) => {
    if ( !loading ) {
      setLoading(true);
      setStatus(0);
      props.onClick().then(( res: any ) => {
        setLoading(false);
        setStatus(1);
      }).catch(( err: any ) => {
        props.handleErr(err);
        setLoading(false);
        setStatus(2);
      })
    }
  };

  return (
    <div style={ { position: "relative" } }>
      <StyledButton { ...props } color={ status == 0 ? "primary" : (status == 1 ? "success" : "error") }
                    onClick={ handleClick } disabled={ loading }>{ props.text }</StyledButton>
      { loading && <CircularProgress
        size={ 24 }
        sx={ {
          color: green[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        } }
      /> }
    </div>
  );
};

const StyledButton = styled(Button)`
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1.25px;
`;
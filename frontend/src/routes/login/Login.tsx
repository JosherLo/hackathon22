import { LoginContainer, LogoDiv, LogoImg } from "./Login.styles";
import { ButtonProgress } from "../../components/input/ButtonProgress";
import React, { useEffect, useRef, useState } from "react";
import { TextField } from "../../components/input/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { TextFieldProps } from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useCookies } from "react-cookie";
import { checkUser, createUser } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import logo from "../../assets/logo.svg";

export const Login = () => {
  const navigate = useNavigate();
  const name = useRef<TextFieldProps>(null);
  const pass = useRef<TextFieldProps>(null);
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);

  useEffect(() => {
    // check if username and password exist and match if so redirect to home
    if (cookies.username && cookies.password) {
      console.log(cookies.username + " " + cookies.password);
      // trust the cookies bro
      navigate("/home");
    }
  }, [cookies]);

  const handleClickShowPassword = () => {
    setShowPass((p) => !p);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LoginContainer>
      <LogoDiv>
        <LogoImg src={logo} alt={"Logo"} />
      </LogoDiv>
      <TextField
        inputRef={name}
        label={"NAME"}
        variant={"filled"}
        sx={{ width: 360 }}
      />
      <TextField
        type={showPass ? "text" : "password"}
        inputRef={pass}
        label={"PASSWORD"}
        variant={"filled"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ width: 360 }}
      />
      <ButtonProgress
        onClick={async () => {
          const res = await checkUser(
            name.current!.value as string,
            pass.current!.value as string
          );
          if (res) {
            setCookie("username", btoa(name.current!.value as string), {
              path: "/",
            }); // b64 such security :))
            setCookie("password", btoa(pass.current!.value as string), {
              path: "/",
            });
          } else {
            throw new Error("Invalid username or password");
          }
        }}
        handleErr={async (err: any) => {
          console.error("ERROR LOGGING IN");
          console.log(err);
          setText("Error logging in! Please try again.");
          handleOpen();
        }}
        text="LOGIN"
        variant={"contained"}
        sx={{ width: 360 }}
      />
      <ButtonProgress
        onClick={async () => {
          const res = await createUser(
            name.current!.value as string,
            pass.current!.value as string
          );
          if (res[0]) {
            setCookie("username", btoa(name.current!.value as string), {
              path: "/",
            });
            setCookie("password", btoa(pass.current!.value as string), {
              path: "/",
            });
          } else {
            throw new Error(res[1]);
          }
        }}
        handleErr={async (err: any) => {
          console.error("ERROR CREATING ACCOUNT");
          console.log(err);
          setText(`Error creating account!\n\n${err}`);
          handleOpen();
        }}
        text="CREATE ACCOUNT"
        variant={"contained"}
        sx={{ width: 360 }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {<pre>{text}</pre>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </LoginContainer>
  );
};

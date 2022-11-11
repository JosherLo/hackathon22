import { Container, IconsContainer, MainContainer, ProjectContainer, } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/displays/Header";
import { ProjectTile } from "../../components/displays/ProjectTile";
import { UnderlineTitle } from "../../components/displays/UnderlineTitle";
import { MainPageIcons } from "../../components/displays/MainPageIcons";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { TextFieldProps } from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from "../../components/input/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiEndpoint } from "../../utils/global-constants";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [open, setOpen] = useState(false);
  const password = useRef<TextFieldProps>(null);
  const classname = useRef<TextFieldProps>(null);
  const [showPass, setShowPass] = useState(false);
  const [infoText, setInfoText] = useState("Please enter your password.");

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    } else {
      // lmao just trust the cookies bro :))))
    }
  }, [cookies]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInfoText("Please enter your password.");
  };

  const handleJoinClass = () => {
    axios
      .post(apiEndpoint + `users/${atob(cookies.username)}/joinClass`, {
        password: password.current!.value,
        class: classname.current!.value,
      })
      .then((res) => {
        setOpen(false);
        setInfoText("Please enter your password.");
      })
      .catch((err) => {
        if (err.response.status == 404) {
          setInfoText("Class not found.");
        } else if (err.response.status == 403) {
          setInfoText("Incorrect password.");
        }
      });
  };

  const handleClickShowPassword = () => {
    setShowPass((p) => !p);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Header
        title={"Flow"}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username");
          removeCookie("password");
        }}
      />
      <MainContainer>
        <UnderlineTitle title={"Projects"} />
        <ProjectContainer>
          <ProjectTile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={"/"}
          />
          <ProjectTile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={""}
          />
          <ProjectTile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={""}
          />
          <ProjectTile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={""}
          />
        </ProjectContainer>
        <Divider />
        <IconsContainer>
          <MainPageIcons
            icon={<ImportContactsIcon sx={{ width: 100, height: 100 }} />}
            title={"Notes"}
            link={"/notes"}
          />
          <MainPageIcons
            icon={<PeopleIcon sx={{ width: 100, height: 100 }} />}
            title={"Collaboration"}
            link={"/collab"}
          />
          <MainPageIcons
            icon={<AssignmentIcon sx={{ width: 100, height: 100 }} />}
            title={"Leaderboard"}
            link={"/leaderboard"}
          />
          <MainPageIcons
            icon={<SchoolIcon sx={{ width: 100, height: 100 }} />}
            title={"Join class"}
            onClick={() => {
              handleOpen();
            }}
          />
        </IconsContainer>
      </MainContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New Note</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            {infoText}
          </DialogContentText>
          <TextField
            inputRef={classname}
            label={"CLASS NAME"}
            variant={"filled"}
            sx={{ width: 260 }}
          />
          <TextField
            type={showPass ? "text" : "password"}
            inputRef={password}
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
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 260 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoinClass} autoFocus>
            Ok
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

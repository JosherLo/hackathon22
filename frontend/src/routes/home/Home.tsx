import {
  AddContainer,
  Container,
  IconsContainer,
  MainContainer,
  ProjectContainer,
  TitleContainer,
} from "./Home.styles";
import { useNavigate } from "react-router-dom";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/displays/Header";
import { Tile } from "../../components/displays/Tile";
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
import { TransitEnterexit, Visibility, VisibilityOff } from "@mui/icons-material";
import { apiEndpoint, ProjectTimelineDeadline } from "../../utils/global-constants";
import axios from "axios";
import { StyledSelect, TagsDiv } from "../notes/Notes.styles";
import { MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ButtonProgress } from "../../components/input/ButtonProgress";
import { CircleButton } from "../../components/input/CircleButton";

export const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openJoinProject, setOpenJoinProject] = useState(false);
  const password = useRef<TextFieldProps>(null);
  const classname = useRef<TextFieldProps>(null);
  const passwordP = useRef<TextFieldProps>(null);
  const projname = useRef<TextFieldProps>(null);
  const [showPass, setShowPass] = useState(false);
  const [infoText, setInfoText] = useState("Please enter your password.");
  const [modules, setModules] = React.useState<string[]>([]);
  const [selectedModule, setSelectedModule] = React.useState<string>("");
  const newMember = useRef<TextFieldProps>(null);
  const [ projectName, setProjectName ] = useState("");
  const [ projectDescription, setProjectDescription ] = useState("");
  const [ deadlines, setDeadlines ] = useState<{[key: string]: ProjectTimelineDeadline}>({});

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    } else {
      axios
        .get(`${apiEndpoint}users/${atob(cookies.username)}/classes`)
        .then((response) => {
          if (response.data.hasOwnProperty("classes")) {
            setModules(response.data.classes);
          }
        });
    }
  }, [cookies]);

  const handleOpenJoinProject = () => {
    setOpenJoinProject(true);
  }

  const handleCloseJoinProject = () => {
    setOpenJoinProject(false);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInfoText("Please enter your password.");
  };

  const handleOpenProject = () => {
    setOpenDialog(true);
  };

  const handleJoinProject = () => {

  }

  const handleCloseProject = () => {
    setOpenDialog(false);
  };

  const handleNewProject = () => {

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
        logoText
        title={""}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username", { path: "/" });
          removeCookie("password", { path: "/" });
        }}
      />
      <MainContainer>
        <TitleContainer>
          <UnderlineTitle title={"Your Projects"} />
          <AddContainer>
            <CircleButton onClick={() => {
              setOpenDialog(true);
            }} icon={<AddIcon sx={{ width: 25, height: 25 }} />} />
          </AddContainer>
          <AddContainer>
            <CircleButton onClick={() => {
              setOpenJoinProject(true);
            }} icon={<TransitEnterexit sx={{ width: 25, height: 25 }} />} />
          </AddContainer>
        </TitleContainer>
        <ProjectContainer>
          <Tile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={"/project/physics y4/hi"}
          />
          <Tile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={""}
          />
          <Tile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={""}
          />
          <Tile
            title={"Title"}
            description={"Desc"}
            people={"(Ppl)"}
            link={""}
          />
        </ProjectContainer>
        <IconsContainer>
          <MainPageIcons
            icon={<ImportContactsIcon sx={{ width: 100, height: 100 }} />}
            title={"Notes"}
            link={"/notes"}
          />
          <MainPageIcons
            icon={<PeopleIcon sx={{ width: 100, height: 100 }} />}
            title={"Forum"}
            link={"/forum"}
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


      <Dialog
        open={openJoinProject}
        onClose={handleCloseJoinProject}
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
            inputRef={projname}
            label={"PROJECT NAME"}
            variant={"filled"}
            sx={{ width: 260 }}
          />
          <TextField
            type={showPass ? "text" : "password"}
            inputRef={passwordP}
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
          <Button onClick={handleJoinProject} autoFocus>
            Ok
          </Button>
          <Button onClick={handleCloseJoinProject} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openDialog}
        onClose={handleCloseProject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New Project</DialogTitle>
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
            {}
          </DialogContentText>
          <TextField
            sx={{ width: 260 }}
            size={"small"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setProjectName(e.target.value)}
            label={"Name of project"}
            variant={"filled"}
          />
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={selectedModule}
            onChange={(e) => {
              setSelectedModule(e.target.value as string);
            }}
          >
            {modules.map((a) => (
              <MenuItem value={a}>{a}</MenuItem>
            ))}
          </StyledSelect>
          <TextField
            sx={{ width: 260 }}
            size={"small"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setProjectDescription(e.target.value)}
            label={"Project description"}
            variant={"filled"}
          />
          <TextField
            sx={{ width: 260 }}
            size={"small"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setProjectDescription(e.target.value)}
            label={"Project password"}
            variant={"filled"}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewProject} autoFocus>
            Ok
          </Button>
          <Button onClick={handleCloseProject} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

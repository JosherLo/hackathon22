import { Container, Description, InfoCol, InfoRow, MainContainer, TimelineDiv, Title } from "./Project.styles";
import { Header } from "../../components/displays/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useEffect, useRef, useState } from "react";
import {ProjectTable} from "../../components/displays/ProjectTable";
import { DateTime } from "luxon";
import { ProjectTimeline } from "../../components/displays/ProjectTimeline";
import { ProjectType } from "../../utils/global-constants";
import { ButtonProgress } from "../../components/input/ButtonProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from "../../components/input/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextFieldProps } from "@mui/material/TextField";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const ProjectsPage = () => {

  const navigate = useNavigate();
  const { className, id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [ project, setProject ] = useState<{ [key: string]: ProjectType } | null>(null);
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const desc = useRef<TextFieldProps>(null);
  const projName = useRef<TextFieldProps>(null);
  const [ people, setPeople ] = useState<string[]>([]);
  const [ checked, setChecked ] = useState<boolean[]>([]);

  useEffect(() => {
    setProject({
      "HE Project": {
        class: "physics y4",
        people: ["a", "b", "c","d"],
        description: "This is a description of the project",
        deadlines: {
          "do chores": {
            deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
          },
          "do chores 1": {
            deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
          },
          "do chores 2": {
            deadline: DateTime.fromSQL("2017-05-15"), people: ["a", "b", "c"], completed: false, description: "wwpwpwpwpwpw"
          },
        }
      }
    });
    setPeople(["a", "b", "c","d"]);
  }, []);

  const data = {
    "do chores": {
      deadline: DateTime.fromSQL("2017-05-15"),
      people: ["a", "b", "c"],
      completed: false,
      description: "wwpwpwpwpwpw",
    },
    "do chores 1": {
      deadline: DateTime.fromSQL("2017-05-15"),
      people: ["a", "b", "c"],
      completed: false,
      description: "wwpwpwpwpwpw",
    },
    "do chores 2": {
      deadline: DateTime.fromSQL("2017-05-15"),
      people: ["a", "b", "c"],
      completed: false,
      description: "wwpwpwpwpwpw",
    },
  }

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    }
  }, [cookies]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAddTask= () => {

  }

  return (
    <Container>
      <Header name={cookies.username ? atob(cookies.username) : ""} logout={() => {
        removeCookie("username", { path: "/" });
        removeCookie("password", { path: "/" });
      }} title={"PROJECT"} />
      { project && <MainContainer>
        <InfoRow>
          <InfoCol>
            <Title>{ Object.entries(project)[0][0] }</Title>
            <Description>{ Object.entries(project)[0][1].description }</Description>
            <Description>{ `Class: ${Object.entries(project)[0][1].class}` }</Description>
            <Description>{ `Members: ${Object.entries(project)[0][1].people.join(", ")}` }</Description>
          </InfoCol>
          <TimelineDiv>
            <ProjectTimeline data={ Object.entries(project)[0][1].deadlines }/>
          </TimelineDiv>
        </InfoRow>
        <ButtonProgress
          onClick={async () => {
            handleOpen();
          }}
          handleErr={async (err: any) => {}}
          text="NEW TASK"
          variant={"contained"}
          sx={{ width: 260 }}
        />
        <ProjectTable onChecked={(checked: boolean, key: string) => {
          // axios to set completed
          // update the project
        } } data={ Object.entries(project)[0][1].deadlines }/>
      </MainContainer> }
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
          <TextField
            inputRef={projName}
            label={"TASK NAME"}
            variant={"filled"}
            sx={{ width: 260 }}
          />
          <TextField
            inputRef={desc}
            label={"TASK DESCRIPTION"}
            variant={"filled"}
            sx={{ width: 260 }}
          />
          <TextField
            id="datetime-local"
            label="Deadline"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {
            people.map((person, index) => {
              return (
                <FormControlLabel control={ <Checkbox checked={checked[index]} onChange={(e) => {
                  setChecked((t) => {
                    const temp = [...t];
                    temp[index] = e.target.checked;
                    return temp;
                  });
                }} /> } label={person} />
              )
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTask} autoFocus>
            Ok
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
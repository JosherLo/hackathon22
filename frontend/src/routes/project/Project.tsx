import { Container, Description, InfoCol, InfoRow, MainContainer, TimelineDiv, Title } from "./Project.styles";
import { Header } from "../../components/displays/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useEffect, useRef, useState } from "react";
import {ProjectTable} from "../../components/displays/ProjectTable";
import { DateTime } from "luxon";
import { ProjectTimeline } from "../../components/displays/ProjectTimeline";
import { apiEndpoint, ProjectType } from "../../utils/global-constants";
import { ButtonProgress } from "../../components/input/ButtonProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
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
import axios from "axios";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const ProjectsPage = () => {

  const navigate = useNavigate();
  const { className, id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [ project, setProject ] = useState< ProjectType | null>(null);
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const desc = useRef<TextFieldProps>(null);
  const projName = useRef<TextFieldProps>(null);
  const [deadline, setDeadline] = useState<DateTime>(DateTime.now());
  const [ people, setPeople ] = useState<string[]>([]);
  const [ checked, setChecked ] = useState<boolean[]>([]);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if (!cookies.username || !cookies.password) {
      navigate("/");
    } else {
      updateProject();
    }
  }, [cookies]);

  const updateProject = () => {
    axios.get(`${ apiEndpoint }users/${ atob(cookies.username) }/classes/${className}/projects/${id}`).then((res) => {
      setProject(res.data.project);
      setPeople(res.data.project.people);
      setChecked(res.data.project.people.map(() => false));
    });
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAddTask = () => {
    console.log(people.filter((_, i) => checked[i]));
    axios.put(`${ apiEndpoint }users/${ atob(cookies.username) }/classes/${className}/projects/${id}/tasks`, {
      name: projName.current!.value,
      description: desc.current!.value,
      deadline: deadline.toISO(),
    }).then(async (res) => {
      handleClose();
      for (let person of people.filter((_, i) => checked[i])) {
        await axios.put(`${ apiEndpoint }users/${ person }/classes/${className}/projects/${id}/tasks/${projName.current!.value}/join`);
      }
      updateProject();
    });
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
            <Description>{ project.description }</Description>
            <Description>{ `Class: ${className}` }</Description>
            <Description>{ `Members: ${people.join(", ")}` }</Description>
          </InfoCol>
          <TimelineDiv>
            <ProjectTimeline data={ project.deadlines }/>
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
          axios.put(`${ apiEndpoint }users/${ atob(cookies.username) }/classes/${className}/projects/${id}/tasks/${key}/complete`).then(r => {
            updateProject();
          });
        } } data={ project.deadlines }/>
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
          <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DateTimePicker
            label="Date&Time picker"
            value={deadline}
            onChange={(e) => setDeadline(e!)}
            renderInput={(params) => <TextField
              id="datetime-local"
              label="Deadline"
              type="datetime-local"
              sx={{ width: 260 }}
              InputLabelProps={{
                shrink: true,
              }}
            />}/>
          </LocalizationProvider>

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
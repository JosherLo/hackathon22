import { useNavigate } from "react-router-dom";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/displays/Header";
import {
  CodeEditorStyled,
  Container,
  EditorDiv,
  InfoRow,
  MainContainer,
  NoteItemList,
  Panel,
  StyledSelect,
  TagsDiv,
  Title,
} from "./Notes.styles";
import {
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  TextFieldProps,
} from "@mui/material";
import { TextField } from "../../components/input/TextField";
import axios from "axios";
import { apiEndpoint } from "../../utils/global-constants";
import { NoteListItem } from "../../components/displays/NoteListItem";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { ButtonProgress } from "../../components/input/ButtonProgress";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SaveIcon from "@mui/icons-material/Save";
import { commands } from "@uiw/react-md-editor";

export const Notes = () => {
  const navigate = useNavigate();
  const newTag = useRef<TextFieldProps | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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

  const [modules, setModules] = React.useState<string[]>([]);
  const [selectedModule, setSelectedModule] = React.useState<string>("");
  const [lastSelectedTag, setLastSelectedTag] = React.useState<string>("");
  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [lastSelectedTagDialog, setLastSelectedTagDialog] =
    React.useState<string>("");
  const [selectedTagsDialog, setSelectedTagsDialog] = React.useState<string[]>(
    []
  );
  const [search, setSearch] = React.useState<string>("");
  const [notes, setNotes] = React.useState<any>({});
  const [selectedNote, setSelectedNote] = React.useState<string>("");
  const [code, setCode] = React.useState("");
  const [noteName, setNoteName] = React.useState("");
  const [noteToDelete, setNoteToDelete] = React.useState("");
  const [upvoted, setUpvoted] = React.useState(false);
  const [noteList, setNoteList] = useState<ReactElement[]>([]);
  const [tags, setTags] = useState<ReactElement[]>([]);
  const [tagsDialog, setTagsDialog] = useState<ReactElement[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const updateNotesGet = async (mod: string) => {
    if (mod != "") {
      const res = await axios.get(
        `${apiEndpoint}users/${atob(cookies.username)}/classes/${mod}/notes`
      );
      const tagsTemp = [];
      for (let [key, val] of Object.entries(res.data.notes)) {
        // @ts-ignore
        for (let tag of val.tags) {
          if (tagsTemp.indexOf(tag) == -1) {
            tagsTemp.push(tag);
          }
        }
      }

      setAllTags(tagsTemp);
      setNotes(res.data.notes);
    }
  };

  const handleClickNew = () => {
    if (newTag.current!.value != "") {
      // @ts-ignore
      setSelectedTagsDialog([...selectedTagsDialog, newTag.current!.value]);
      newTag.current!.value = "";
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    axios
      .delete(
        `${apiEndpoint}users/${atob(
          cookies.username
        )}/classes/${selectedModule}/notes/${noteToDelete}`
      )
      .then((response) => {
        setOpenDelete(false);
        setSelectedNote("");
        setCode("");
        updateNotesGet(selectedModule);
      });
  };

  const handleNewNote = () => {
    if (selectedModule != "" && noteName != "") {
      axios
        .put(
          `${apiEndpoint}users/${atob(
            cookies.username
          )}/classes/${selectedModule}/notes`,
          {
            name: noteName,
            markdown: `# ${noteName}`,
            tags: selectedTagsDialog,
          }
        )
        .then((response) => {
          updateNotesGet(selectedModule).then((res) => {
            setSelectedTagsDialog([]);
            setLastSelectedTagDialog("");
            setNoteName("");
            setCode(`# ${noteName}`);
            setSelectedNote(noteName);
            setOpen(false);
          });
        });
    }
  };

  useEffect(() => {
    const tempTags = selectedTags.map((tag) => {
      return (
        <Chip
          label={tag}
          onClick={() => {
            setSelectedTags(selectedTags.filter((value) => value !== tag));
          }}
        />
      );
    });

    setTags(tempTags);
  }, [selectedTags]);

  useEffect(() => {
    const tempTagsDialog = selectedTagsDialog.map((tag) => {
      return (
        <Chip
          label={tag}
          onClick={() => {
            setSelectedTagsDialog(
              selectedTagsDialog.filter((value) => value !== tag)
            );
          }}
        />
      );
    });

    setTagsDialog(tempTagsDialog);
  }, [selectedTagsDialog]);

  useEffect(() => {
    const items = [];
    const tempList = { ...notes };
    const ooh = Object.entries(tempList).filter(([key, val]) => {
      return (
        (val as { tags: string[] }).tags.some((v: any) =>
          selectedTags.length > 0
            ? selectedTags.includes(v)
            : allTags.includes(v)
        ) &&
        key
          .split(" ")
          .some((v) => search.split(" ").some((v2) => v.indexOf(v2) != -1))
      );
    });

    ooh.sort((a, b) => {
      console.log(a)
      return notes[a[0]].upVotes.length > notes[b[0]].upVotes.length ? -1 : 1;
    });

    for (let [key, val] of ooh) {
      items.push(
        <NoteListItem
          onClick={() => {
            axios
              .get(
                `${apiEndpoint}users/${atob(
                  cookies.username
                )}/classes/${selectedModule}/notes/${key}`
              )
              .then((response) => {
                if (selectedNote != "") {
                  axios
                    .patch(
                      `${apiEndpoint}users/${atob(
                        cookies.username
                      )}/classes/${selectedModule}/notes`,
                      {
                        markdown: code,
                        name: selectedNote,
                        tags: notes[selectedNote].tags,
                      }
                    )
                    .then(() => {
                      setCode(response.data.markdown);
                      setSelectedNote(key);
                      setUpvoted(
                        notes[key].upVotes.includes(atob(cookies.username))
                      );
                    });
                } else {
                  setCode(response.data.markdown);
                  setSelectedNote(key);
                  setUpvoted(
                    notes[key].upVotes.includes(atob(cookies.username))
                  );
                }
              });
          }}
          upvotes={notes[key].upVotes.length}
          delete={() => {
            setOpenDelete(true);
            setNoteToDelete(key);
          }}
          key={key}
          name={key}
          tags={(val as { tags: string[] }).tags}
        />
      );
    }

    setNoteList(items);
  }, [notes, selectedTags]);

  return (
    <Container>
      <Header
        title={"NOTES"}
        name={cookies.username ? atob(cookies.username) : ""}
        logout={() => {
          removeCookie("username", { path: "/" });
          removeCookie("password", { path: "/" });
          navigate("/");
        }}
      />
      <MainContainer>
        <Panel>
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={selectedModule}
            onChange={(e) => {
              setSelectedModule(e.target.value as string);
              setSelectedTags([]);
              updateNotesGet(e.target.value as string);
            }}
          >
            {modules.map((a) => (
              <MenuItem value={a}>{a}</MenuItem>
            ))}
          </StyledSelect>
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={lastSelectedTag}
            onChange={(e) => {
              setLastSelectedTag(e.target.value as string);
              if (!selectedTags.includes(e.target.value as string)) {
                setSelectedTags([...selectedTags, e.target.value as string]);
              }
            }}
          >
            {allTags.map((a) => (
              <MenuItem value={a}>{a}</MenuItem>
            ))}
          </StyledSelect>
          <TagsDiv>{tags}</TagsDiv>
          <TextField
            sx={{ width: 260 }}
            size={"small"}
            onChange={handleChange}
            label={"Search"}
            variant={"filled"}
          />
          <ButtonProgress
            onClick={async () => {
              handleOpen();
            }}
            handleErr={async (err: any) => {}}
            text="NEW NOTE"
            variant={"contained"}
            sx={{ width: 260 }}
          />
          <NoteItemList>{noteList}</NoteItemList>
        </Panel>
        {selectedNote != "" && (
          <EditorDiv>
            <InfoRow>
              <Title>{selectedNote}</Title>
              <ArrowUpwardIcon
                sx={{ cursor: "pointer", color: upvoted ? "#FF8b60" : "white" }}
                onClick={() => {
                  console.log({ ...notes[selectedNote] });
                  if (!upvoted) {
                    axios
                      .post(
                        `${apiEndpoint}users/${atob(
                          cookies.username
                        )}/classes/${selectedModule}/notes/${selectedNote}/upvote`
                      )
                      .then(() => {
                        setUpvoted(true);
                        setNotes((n: any) => {
                          const temp = { ...n };

                          temp[selectedNote] = { ...temp[selectedNote] };
                          temp[selectedNote].upVotes = [
                            ...temp[selectedNote].upVotes,
                          ];
                          temp[selectedNote].upVotes.push(
                            atob(cookies.username)
                          );
                          console.log(temp);
                          return temp;
                        });
                      });
                  } else {
                    axios
                      .delete(
                        `${apiEndpoint}users/${atob(
                          cookies.username
                        )}/classes/${selectedModule}/notes/${selectedNote}/upvote`
                      )
                      .then(() => {
                        setUpvoted(false);
                        setNotes((n: any) => {
                          const temp = { ...n };
                          temp[selectedNote] = { ...temp[selectedNote] };
                          temp[selectedNote].upVotes = temp[
                            selectedNote
                          ].upVotes.filter(
                            (v: string) => v !== atob(cookies.username)
                          );
                          return temp;
                        });
                      });
                  }
                }}
              />
              <SaveIcon
                onClick={() => {
                  axios.patch(
                    `${apiEndpoint}users/${atob(
                      cookies.username
                    )}/classes/${selectedModule}/notes`,
                    {
                      markdown: code,
                      name: selectedNote,
                      tags: notes[selectedNote].tags,
                    }
                  );
                }}
              />
            </InfoRow>
            <CodeEditorStyled
              height={window.innerHeight - 60}
              value={code}
              onChange={(c) => {
                setCode(c!);
              }}
              extraCommands={[
                commands.codeEdit,
                commands.codeLive,
                commands.codePreview,
                commands.divider,
              ]}
            />
          </EditorDiv>
        )}
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
            {}
          </DialogContentText>
          <TextField
            sx={{ width: 260 }}
            size={"small"}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNoteName(e.target.value)}
            label={"Name of note"}
            variant={"filled"}
          />
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={selectedModule}
            onChange={(e) => {
              setSelectedModule(e.target.value as string);
              setSelectedTags([]);
              updateNotesGet(e.target.value as string);
            }}
          >
            {modules.map((a) => (
              <MenuItem value={a}>{a}</MenuItem>
            ))}
          </StyledSelect>
          <StyledSelect
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
            value={lastSelectedTag}
            onChange={(e) => {
              setLastSelectedTagDialog(e.target.value as string);
              if (!selectedTagsDialog.includes(e.target.value as string)) {
                setSelectedTagsDialog([
                  ...selectedTagsDialog,
                  e.target.value as string,
                ]);
              }
            }}
          >
            {allTags.map((a) => (
              <MenuItem value={a}>{a}</MenuItem>
            ))}
          </StyledSelect>
          <TagsDiv>{tagsDialog}</TagsDiv>
          <TextField
            inputRef={newTag}
            label={"New tag"}
            variant={"filled"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickNew}
                    edge="end"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 260 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewNote} autoFocus>
            Ok
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete note</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Ok
          </Button>
          <Button onClick={handleCloseDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

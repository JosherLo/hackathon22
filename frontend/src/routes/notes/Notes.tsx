import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/displays/Header";
import {
  Container,
  MainContainer,
  CodeEditorStyled,
  Panel,
  StyledSelect,
  TagsDiv,
  EditorDiv, NoteItemList
} from "./Notes.styles";
import { Chip, IconButton, InputAdornment, makeStyles, MenuItem, Select, TextFieldProps } from "@mui/material";
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
import { checkUser } from "../../utils/utils";
import { ButtonProgress } from "../../components/input/ButtonProgress";
import AddIcon from '@mui/icons-material/Add';

export const Notes = () => {

  const navigate = useNavigate();
  const newTag = useRef<TextFieldProps>(null);
  const [ cookies, setCookie, removeCookie ] = useCookies([ "username", "password" ]);
  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if ( !cookies.username || !cookies.password ) {
      navigate("/");
    } else {
      axios.get(apiEndpoint + "classes").then(( response ) => {
        setModules(response.data.classes);
      });
    }
  }, [ cookies ]);


  const [ modules, setModules ] = React.useState<string[]>([ "CM4131", "BL4131", "MA4132", "PC4132" ]);
  const [ selectedModule, setSelectedModule ] = React.useState<string>("");
  const [ lastSelectedTag, setLastSelectedTag ] = React.useState<string>("");
  const [ allTags, setAllTags ] = React.useState<string[]>([ "Chapter 1", "Chapter 2", "Chapter 3" ]);
  const [ selectedTags, setSelectedTags ] = React.useState<string[]>([]);
  const [ lastSelectedTagDialog, setLastSelectedTagDialog ] = React.useState<string>("");
  const [ selectedTagsDialog, setSelectedTagsDialog ] = React.useState<string[]>([]);
  const [ search, setSearch ] = React.useState<string>("");
  const [ notes, setNotes ] = React.useState<any>({});
  const [ selectedNote, setSelectedNote ] = React.useState<string>("");
  const [ code, setCode ] = React.useState("");
  const [ noteName, setNoteName ] = React.useState("");

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setSearch(event.target.value);
  };

  const updateNotesGet = async ( mod: string ) => {
    if ( mod != "" ) {
      const res = await axios.get(apiEndpoint + "classes/" + mod + "/notes");
      console.log("hi1");
      const tagsTemp = [];
      console.log(res.data);
      for ( let [ key, val ] of Object.entries(res.data.notes) ) {
        // @ts-ignore
        for ( let tag of val.tags ) {
          if ( tagsTemp.indexOf(tag) == -1 ) {
            tagsTemp.push(tag);
          }
        }
      }
      console.log(tagsTemp);
      setAllTags(tagsTemp);
      setNotes(res.data.notes);
    }
  };

  const handleClickNew = () => {
    if (newTag.current!.value != "") {
      // @ts-ignore
      setSelectedTagsDialog([...selectedTagsDialog, newTag.current!.value]);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewNote = () => {
    if ( selectedModule != "" && noteName != "" ) {
      axios.put(apiEndpoint + "classes/" + selectedModule + "/notes", {
        name: noteName,
        markdown: `# ${noteName}`,
        tags: selectedTagsDialog
      }).then(( response ) => {
        console.log(response);
        updateNotesGet(selectedModule);
        setOpen(false);
      });
    }
  }

  const tags = [];

  for ( let tag of selectedTags ) {
    tags.push(
      <Chip label={ tag } onClick={ () => {
        setSelectedTags(selectedTags.filter(( value ) => value !== tag));
      } }/>
    );
  }

  const tagsDialog = [];

  for ( let tag of selectedTagsDialog ) {
    tagsDialog.push(
      <Chip label={ tag } onClick={ () => {
        setSelectedTagsDialog(selectedTagsDialog.filter(( value ) => value !== tag));
      } }/>
    );
  }

  const items = [];
  const tempList = { ...notes };
  const ooh = Object.entries(tempList).filter(( [ key, val ] ) => {
    return (val as { tags: string[] }).tags.some(( v: any ) => selectedTags.length > 0 ? selectedTags.includes(v) : allTags.includes(v)) && (
      key.split(" ").some(( v ) => search.split(" ").some(( v2 ) => v.indexOf(v2) != -1))
    );
  });

  for ( let [ key, val ] of ooh ) {
    items.push(
      <NoteListItem onClick={ () => {
        axios.get(apiEndpoint + `classes/${ selectedModule }/notes/${ key }`).then(( response ) => {
          if ( selectedNote != "" ) {
            axios.patch(apiEndpoint + `classes/${ selectedModule }/notes`, {
              "markdown": code,
              "name": selectedNote,
              "tags": notes[selectedNote].tags
            }).then(( response1 ) => {
              setCode(response.data.markdown);
              setSelectedNote(key);
            });
          } else {
            setCode(response.data.markdown);
            setSelectedNote(key);
          }
        });
      } } name={ key } tags={ (val as { tags: string[] }).tags }/>
    );
  }

  return (
    <Container>
      <Header title={ "NOTES" } name={ atob(cookies.username) } logout={ () => {
        removeCookie("username");
        removeCookie("password");
      } }/>
      <MainContainer>
        <Panel>
          <StyledSelect SelectDisplayProps={ { style: { paddingTop: 8, paddingBottom: 8 } } } value={ selectedModule }
                        onChange={ e => {
                          setSelectedModule(e.target.value as string);
                          setSelectedTags([]);
                          updateNotesGet(e.target.value as string);
                        } }>{ modules.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <StyledSelect SelectDisplayProps={ { style: { paddingTop: 8, paddingBottom: 8 } } } value={ lastSelectedTag }
                        onChange={ e => {
                          setLastSelectedTag(e.target.value as string);
                          if (!selectedTags.includes(e.target.value as string)) {
                            setSelectedTags([ ...selectedTags, e.target.value as string ]);
                          }
                        } }>{ allTags.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <TagsDiv>{ tags }</TagsDiv>
          <TextField sx={ { width: 260 } } size={ "small" } onChange={ handleChange } label={ "Search" }
                     variant={ "filled" }/>
          <ButtonProgress onClick={ async () => {
            handleOpen();
          } } handleErr={ async ( err: any ) => {
          } } text="NEW NOTE" variant={ "contained" } sx={ { width: 260 } }/>
          <NoteItemList>{ items }</NoteItemList>
        </Panel>
        { selectedNote != "" && <EditorDiv>
          <CodeEditorStyled
            height={ window.innerHeight - 60 }
            value={ code }
            onChange={ ( c ) => {
              setCode(c!);
            } }
          />
        </EditorDiv> }
      </MainContainer>
      <Dialog
        open={ open }
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New Note</DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", gap: "10px"}}>
          <DialogContentText id="alert-dialog-description">{ }</DialogContentText>
          <TextField sx={ { width: 260 } } size={ "small" }
                     onChange={ ( e: { target: { value: React.SetStateAction<string>; }; } ) => setNoteName(e.target.value) }
                     label={ "Name of note" } variant={ "filled" }/>
          <StyledSelect SelectDisplayProps={ { style: { paddingTop: 8, paddingBottom: 8 } } } value={ selectedModule }
                        onChange={ e => {
                          setSelectedModule(e.target.value as string);
                          setSelectedTags([]);
                          updateNotesGet(e.target.value as string);
                        } }>{ modules.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <StyledSelect SelectDisplayProps={ { style: { paddingTop: 8, paddingBottom: 8 } } } value={ lastSelectedTag }
                        onChange={ e => {
                          setLastSelectedTagDialog(e.target.value as string);
                          if (!selectedTagsDialog.includes(e.target.value as string)) {
                            setSelectedTagsDialog([ ...selectedTagsDialog, e.target.value as string ]);
                          }
                        } }>{ allTags.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <TagsDiv>{ tagsDialog }</TagsDiv>
          <TextField inputRef={ newTag } label={ "New tag" } variant={ "filled" }
                     InputProps={ {
                       endAdornment: <InputAdornment position="end">
                         <IconButton
                           aria-label="toggle password visibility"
                           onClick={ handleClickNew }
                           edge="end"
                         >
                            <AddIcon />
                         </IconButton>
                       </InputAdornment>
                     } } sx={ { width: 260 } }/>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleNewNote } autoFocus>Ok</Button>
          <Button onClick={ handleClose } autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
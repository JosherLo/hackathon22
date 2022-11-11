import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
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
import { Chip, MenuItem, Select } from "@mui/material";
import { TextField } from "../../components/input/TextField";
import axios from "axios";
import { apiEndpoint } from "../../utils/global-constants";
import { NoteListItem } from "../../components/displays/NoteListItem";

export const Notes = () => {

  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies([ "username", "password" ]);

  useEffect(() => {
    // checks if username and password exist and match if not redirect back to home
    if ( !cookies.username || !cookies.password ) {
      navigate("/");
    } else {
      axios.get(apiEndpoint + "classes").then((response) => {
        setModules(response.data.classes);
      });
    }
  }, [ cookies ]);

  const [ modules, setModules ] = React.useState<string[]>(["CM4131", "BL4131", "MA4132", "PC4132"]);
  const [ selectedModule, setSelectedModule ] = React.useState<string>("");
  const [ lastSelectedTag, setLastSelectedTag ] = React.useState<string>("");
  const [ allTags, setAllTags ] = React.useState<string[]>(["Chapter 1", "Chapter 2", "Chapter 3"]);
  const [ selectedTags, setSelectedTags ] = React.useState<string[]>([]);
  const [ search, setSearch ] = React.useState<string>("");
  const [ notes, setNotes ] = React.useState<any>({});
  const [ selectedNote, setSelectedNote ] = React.useState<string>("");
  const [ code, setCode ] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const updateNotesGet = async (mod: string) => {
    if (mod != "") {
      const res = await axios.get(apiEndpoint + "classes/" + mod + "/notes");
      console.log("hi1");
      const tagsTemp = [];
      console.log(res.data);
      for (let [key, val] of Object.entries(res.data.notes)) {
        // @ts-ignore
        for (let tag of val.tags) {
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

  const tags= [];

  for (let tag of selectedTags) {
    tags.push(
      <Chip label={tag} onClick={() => {
        setSelectedTags(selectedTags.filter((value) => value !== tag));
      }} />
    );
  }

  const items = [];
  const tempList = {...notes};
  const ooh = Object.entries(tempList).filter(([key, val]) => {
    return (val as {tags: string[]}).tags.some((v: any) => selectedTags.length > 0 ? selectedTags.includes(v) : allTags.includes(v)) && (
      key.split(" ").some((v) => search.split(" ").some((v2) => v.indexOf(v2) != -1))
    );
  });

  for (let [key, val] of ooh) {
    items.push(
      <NoteListItem onClick={() => {
        axios.get(apiEndpoint + `classes/${selectedModule}/notes/${key}`).then((response) => {
          if (selectedNote != "") {
            axios.patch(apiEndpoint + `classes/${selectedModule}/notes`, {
              "markdown": code,
              "name": selectedNote,
              "tags": notes[selectedNote].tags
            }).then((response1) => {
              setCode(response.data.markdown);
              setSelectedNote(key);
            });
          } else {
            setCode(response.data.markdown);
            setSelectedNote(key);
          }
        });
      }} name={key} tags={(val as {tags: string[]}).tags} />
    );
  }

  return (
    <Container>
      <Header title={"NOTES"} name={atob(cookies.username)} logout={ () => {
        removeCookie("username");
        removeCookie("password");
      } }/>
      <MainContainer>
        <Panel>
          <StyledSelect value={ selectedModule } onChange={ e => {
            setSelectedModule(e.target.value as string);
            updateNotesGet(e.target.value as string);
          } }>{ modules.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <StyledSelect value={ lastSelectedTag } onChange={ e => {
            setLastSelectedTag(e.target.value as string);
            setSelectedTags([...selectedTags, e.target.value as string]);
          } }>{ allTags.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <TagsDiv>{tags}</TagsDiv>
          <TextField onChange={handleChange} label={ "Search" } variant={ "filled" } sx={ { margin: "2px 10px" } }/>
          <NoteItemList>{items}</NoteItemList>
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
    </Container>
  );
}
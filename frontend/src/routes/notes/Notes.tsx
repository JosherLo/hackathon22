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
  Tag,
  TagsDiv,
  EditorDiv
} from "./Notes.styles";
import { MenuItem, Select } from "@mui/material";
import { TextField } from "../../components/input/TextField";
import axios from "axios";
import { apiEndpoint } from "../../utils/global-constants";

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
        updateNotes();
      });
    }
  }, [ cookies ]);

  const [ modules, setModules ] = React.useState<string[]>(["CM4131", "BL4131", "MA4132", "PC4132"]);
  const [ selectedModule, setSelectedModule ] = React.useState<string>("");
  const [ lastSelectedTag, setLastSelectedTag ] = React.useState<string>("");
  const [ allTags, setAllTags ] = React.useState<string[]>(["Chapter 1", "Chapter 2", "Chapter 3"]);
  const [ selectedTags, setSelectedTags ] = React.useState<string[]>([]);
  const [ search, setSearch ] = React.useState<string>("");
  const [ notes, setNotes ] = React.useState<string[]>([]);
  const [ selectedNote, setSelectedNote ] = React.useState<string>("");
  const [ code, setCode ] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const updateNotes = async () => {
    if (selectedModule != "") {
      const res = await axios.get(apiEndpoint + "classes/" + selectedModule + "/notes");
    }
  };

  const tags= [];

  for (let tag of selectedTags) {
    tags.push(
      <Tag onClick={() => {
        setSelectedTags(selectedTags.filter((value) => value !== tag));
        updateNotes();
      }}>{tag}</Tag>
    );
  }

  return (
    <Container>
      <Header name={atob(cookies.username)} logout={ () => {
        removeCookie("username");
        removeCookie("password");
      } }/>
      <MainContainer>
        <Panel>
          <StyledSelect value={ selectedModule } onChange={ e => setSelectedModule(e.target.value as string) }>{ modules.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <StyledSelect value={ lastSelectedTag } onChange={ e => {
            setLastSelectedTag(e.target.value as string);
            setSelectedTags([...selectedTags, e.target.value as string]);
            updateNotes();
          } }>{ allTags.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>
          <TagsDiv>{tags}</TagsDiv>
          <TextField onChange={handleChange} label={ "Search" } variant={ "filled" } sx={ { margin: "2px 10px" } }/>
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
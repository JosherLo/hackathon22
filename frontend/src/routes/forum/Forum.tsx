import {Container, DropdownPanel, MainContainer, SearchPanel, SelectionPanel} from "./Forum.styles";
import {Header} from "../../components/displays/Header";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {apiEndpoint} from "../../utils/global-constants";
import {StyledSelect} from "../notes/Notes.styles";
import {MenuItem} from "@mui/material";
import {TextField} from "../../components/input/TextField";

export const Forum = () => {

    const navigate = useNavigate();
    const [ cookies, setCookie, removeCookie ] = useCookies([ "username", "password" ]);

    useEffect(() => {
        // checks if username and password exist and match if not redirect back to home
        if ( !cookies.username || !cookies.password ) {
            navigate("/");
        } else {
            axios.get(apiEndpoint + "classes").then((response) => {
                setModules(response.data.classes);
                updateForum().then();
            });
        }
    }, [ cookies ]);

    const [ modules, setModules ] = React.useState<string[]>(["CM4131", "BL4131", "MA4132", "PC4132"]);
    const [ selectedModule, setSelectedModule ] = React.useState<string>("");
    const [ search, setSearch ] = React.useState<string>("");

    const updateForum = async () => {
        if (selectedModule != "") {
            const res = await axios.get(apiEndpoint + "classes/" + selectedModule + "/leaderboard");
        }
    };

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setSearch(event.target.value);
    };

    return (
      <Container>
          <Header title={"FORUM"} name={ cookies.username ? atob(cookies.username) : ""} logout={ () => {
              removeCookie("username");
              removeCookie("password");
          } }/>
          <MainContainer>
              <SelectionPanel>
                  <p>hi</p>
                  <p>hi2</p>

                  {/*<DropdownPanel>*/}
                  {/*    <StyledSelect SelectDisplayProps={ { style: { paddingTop: 8, paddingBottom: 8 } } } value={ selectedModule }*/}
                  {/*                  onChange={ e => {*/}
                  {/*                      setSelectedModule(e.target.value as string);*/}
                  {/*                  } }>{ modules.map(a => <MenuItem value={ a }>{ a }</MenuItem>) }</StyledSelect>*/}
                  {/*</DropdownPanel>*/}
                  {/*<SearchPanel>*/}
                  {/*    <TextField sx={ { width: 260 } } size={ "small" } onChange={ handleChange } label={ "Search" }*/}
                  {/*               variant={ "filled" }/>*/}
                  {/*</SearchPanel>*/}
              </SelectionPanel>
          </MainContainer>
      </Container>
    )
};

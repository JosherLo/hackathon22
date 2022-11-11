import {Header} from "../../components/displays/Header";
import {Container, MainContainer, LeaderboardList, LeaderboardItem, LeaderboardHeader} from "./Leaderboard.styles";
import {MenuItem} from "@mui/material";
import React, {useEffect} from "react";
import {TextField} from "../../components/input/TextField";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {apiEndpoint} from "../../utils/global-constants";

export const Leaderboard = () => {

    const navigate = useNavigate();
    const [ cookies, setCookie, removeCookie ] = useCookies([ "username", "password" ]);

    useEffect(() => {
        // checks if username and password exist and match if not redirect back to home
        if ( !cookies.username || !cookies.password ) {
            navigate("/");
        } else {
            axios.get(apiEndpoint + "classes").then((response) => {
                setModules(response.data.classes);
                updateLeaderboard();
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

    const updateLeaderboard = async () => {
        if (selectedModule != "") {
            const res = await axios.get(apiEndpoint + "classes/" + selectedModule + "/leaderboard");
        }
    };

    const data = [
        { name: "Anom", notesScore: 100, forumScore: 100 },
        { name: "Anom", notesScore: 200, forumScore: 100 },
        { name: "Anom", notesScore: 300, forumScore: 100 },
    ];


    return (
        <Container>
            <Header logoText title={"LEADERBOARD"} name={ cookies.username ? atob(cookies.username) : ""} logout={ () => {
                removeCookie("username");
                removeCookie("password");
            } }/>
            <MainContainer>
                <LeaderboardList>
                    <LeaderboardHeader/>
                    {
                        data.map((item) => {
                            return <LeaderboardItem name={item.name} notesScore={item.notesScore} forumScore={item.forumScore}/>
                        })
                    }
                </LeaderboardList>
            </MainContainer>
        </Container>
    );
}
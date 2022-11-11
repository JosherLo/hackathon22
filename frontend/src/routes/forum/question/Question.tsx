import { Header } from "../../../components/displays/Header"
import React, { useEffect, useState } from "react"
import { Container, MainContainer, Title } from "./Question.styles";
import { useCookies } from "react-cookie"
import axios from "axios"
import { apiEndpoint } from "../../../utils/global-constants"
import { useParams } from "react-router-dom"

export default function Question() {
    const { className, id } = useParams()
    const [cookies, setCookie, removeCookie] = useCookies([
        "username",
        "password",
    ]);
    const [username, password] = [atob(cookies.username), atob(cookies.password)]
    const [questionData, setQuestionData] = useState<{title: string} | undefined>(undefined)

    useEffect(() => {
        axios.get(`${apiEndpoint}users/${username}/classes/${className}/questions`).then((resp) => {
            setQuestionData(resp.data.questions[id as string])
        })
    }, [])

    return (
        <Container>
            <Header
                title={"FORUM"}
                name={cookies.username ? atob(cookies.username) : ""}
                logout={() => {
                    removeCookie("username");
                    removeCookie("password");
                }}
            />
            <MainContainer>
                {
                    questionData &&
                    <Title>
                        {questionData.title}
                    </Title>
                }
            </MainContainer>
        </Container>
    )
}
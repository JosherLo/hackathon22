import { Router } from "express"
import fs from "fs"
import perQuestionRouter from "./perQuestion"
import { DateTime } from "luxon"

const questionsRouter = Router({ mergeParams: true })

questionsRouter.get("/", (req, res) => {
    const classId = req.params.classId

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    res.json({ questions: manifest })
})

questionsRouter.put("/", (req, res) => {
    const classId = req.params.classId
    const user = req.params.username
    const bodyData = req.body

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    let question = {
        tags: bodyData.tags || [],
        title: bodyData.title,
        asker: user,
        markdown: bodyData.markdown,
        type: bodyData.type,
        created: DateTime.now().toISO(),
        upVotes: [user],
    }

    if (bodyData.type === "question") {
        question = {
            ...question,
            answer: bodyData.answer,
            solvers: [],
        }
    } else if (bodyData.type === "clarification") {
        question = {
            ...question,
            solved: false,
            solveAnswerId: 0,
            answers: [],
        }
    }

    manifest.push(question)

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.json({ questionCode: manifest.length - 1 })
})

questionsRouter.use("/:qId(\\d+)", perQuestionRouter)

export default questionsRouter

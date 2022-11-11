import { Router } from "express"
import fs from "fs"

const perQuestionRouter = Router({ mergeParams: true })

perQuestionRouter.post("/solve/", (req, res) => {
    const classId = req.params.classId
    const solver = req.params.username
    const questionId = req.params.qId
    const answer = req.body.answer

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    if (
        manifest[questionId].type === "clarification" ||
        manifest[questionId].asker === solver
    ) {
        res.sendStatus(400)
        return
    }

    if (manifest[questionId].answer !== answer) {
        res.sendStatus(406) // 406 Not Acceptable lmao
        return
    }

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, {
            encoding: "utf8",
        })
    )

    classManifest[solver].forumScore += 5 // 5 score for solving a question

    manifest[questionId].solvers.push(solver)

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    fs.writeFileSync(
        `storage/${classId}/students.json`,
        JSON.stringify(classManifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

perQuestionRouter.patch("/", (req, res) => {
    const classId = req.params.classId
    const questionId = req.params.qId
    const bodyData = req.body

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    const asker = manifest[questionId].asker

    if (asker !== bodyData.user) {
        res.sendStatus(403)
        return
    }

    manifest[questionId] = {
        ...manifest[questionId],
        tags: bodyData.tags || manifest[questionId].tags,
        title: bodyData.title || manifest[questionId].title,
        markdown: bodyData.markdown || manifest[questionId].markdown,
    }

    res.sendStatus(200)
})

perQuestionRouter.delete("/", (req, res) => {
    const classId = req.params.classId
    const questionId = req.params.qId
    const user = req.params.username

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    const asker = manifest[questionId].asker

    if (manifest.length <= questionId) {
        res.sendStatus(400)
        return
    }

    if (user === asker) {
        res.sendStatus(403)
        return
    }

    if (manifest[questionId].type !== "clarification") {
        const classManifest = JSON.parse(
            fs.readFileSync(`storage/${classId}/students.json`, {
                encoding: "utf8",
            })
        )

        classManifest[asker].forumScore -= manifest[questionId].upVotes.length

        fs.writeFileSync(
            `storage/${classId}/students.json`,
            JSON.stringify(classManifest),
            { encoding: "utf8" }
        )
    }
    manifest.splice(questionId, 1)

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

perQuestionRouter.post("/answer/", (req, res) => {
    const classId = req.params.classId
    const questionId = req.params.qId
    const user = req.params.username
    const answer = req.body.answer

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    if (
        manifest.length <= questionId ||
        manifest[questionId].type !== "clarification" ||
        manifest[questionId].solved
    ) {
        res.sendStatus(400)
        return
    }

    manifest[questionId].answers.push({ user, answer })

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.json({ answerId: manifest[questionId].answers.length })
})

perQuestionRouter.post("/acceptAnswer", (req, res) => {
    const classId = req.params.classId
    const questionId = req.params.qId
    const user = req.params.username
    const answerId = req.body.answerId

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    if (
        manifest.length <= questionId ||
        manifest[questionId].type !== "clarification" ||
        manifest[questionId].solved
    ) {
        res.sendStatus(400)
        return
    }

    if (manifest[questionId].asker !== user) {
        res.sendStatus(403)
        return
    }

    manifest[questionId].solved = true
    manifest[questionId].solveAnswerId = answerId

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, {
            encoding: "utf8",
        })
    )

    classManifest[manifest[questionId].answers[answerId].user].forumScore += 10 // 10 score for an accepted answer

    fs.writeFileSync(
        `storage/${classId}/students.json`,
        JSON.stringify(classManifest),
        { encoding: "utf8" }
    )

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

perQuestionRouter.post("/upvote", (req, res) => {
    const classId = req.params.classId
    const questionId = req.params.qId
    const username = req.params.username

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, {
            encoding: "utf8",
        })
    )

    manifest[questionId].upVotes.push(username)
    classManifest[manifest[questionId].asker].forumScore++ // 1 score for an upvote

    fs.writeFileSync(
        `storage/${classId}/students.json`,
        JSON.stringify(classManifest),
        { encoding: "utf8" }
    )

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

perQuestionRouter.delete("/upvote", (req, res) => {
    const classId = req.params.classId
    const questionId = req.params.qId
    const username = req.params.username

    const manifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/questions/questions.json`, {
            encoding: "utf8",
        })
    )

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, {
            encoding: "utf8",
        })
    )

    const index = manifest[questionId].upVotes.indexOf(username)
    if (index === -1) {
        res.sendStatus(404)
        return
    }

    manifest[questionId].upVotes.splice(index, 1)

    classManifest[manifest[questionId].asker].forumScore-- // 1 score for an upvote

    fs.writeFileSync(
        `storage/${classId}/students.json`,
        JSON.stringify(classManifest),
        { encoding: "utf8" }
    )

    fs.writeFileSync(
        `storage/${classId}/questions/questions.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

export default perQuestionRouter

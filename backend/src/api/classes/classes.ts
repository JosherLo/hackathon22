import { Router } from "express"
import notesRouter from "./notes/notes"
import fs from "fs"
import questionsRouter from "./question/questions"

const classesRouter = Router({ mergeParams: true })

classesRouter.use("/:classId", (req, res, next) => {
    console.log("hi")
    const classId = req.params.classId
    const username = req.params.username

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, {
            encoding: "utf8",
        })
    )

    if (!(username in classManifest)) {
        res.sendStatus(403)
        return
    }

    next()
})
classesRouter.use("/:classId/notes", notesRouter)
classesRouter.use("/:classId/questions", questionsRouter)

classesRouter.get("/", (req, res) => {
    const studentManifest = JSON.parse(
        fs.readFileSync(`storage/studentClasses.json`, { encoding: "utf8" })
    )

    const username = req.params.username

    return res.json({ classes: studentManifest[username] })
})

classesRouter.get("/:classId/scores/", (req, res) => {
    const classId = req.params.classId

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, { encoding: "utf8" })
    )

    return res.json({data: classManifest})
})

export default classesRouter

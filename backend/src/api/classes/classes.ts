import { Router } from "express"
import notesRouter from "./notes/notes"
import fs from "fs"

const classesRouter = Router({ mergeParams: true })

classesRouter.use("/:classId/notes", notesRouter)

classesRouter.get("/", (req, res) => {
    return res.json({ classes: fs.readdirSync("storage") })
})

export default classesRouter

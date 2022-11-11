import { Router } from "express"
import authRouter from "./auth/auth"
import notesRouter from "./notes/notes"

const apiRouter = Router()

apiRouter.get("/", (req, res) => {
    res.send("hi")
})

apiRouter.use("/auth", authRouter)
apiRouter.use("/notes", notesRouter)

export { apiRouter }

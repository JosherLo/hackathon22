import { Router } from "express"
import authRouter from "./auth/auth"
import classesRouter from "./classes/classes"

const apiRouter = Router()

apiRouter.get("/", (req, res) => {
    res.send("hi")
})

apiRouter.use("/auth", authRouter)
apiRouter.use("/classes", classesRouter)

export { apiRouter }

import { Router } from "express"
import authRouter from "./auth/auth"
import userRouter from "./users/users"

const apiRouter = Router()

apiRouter.get("/", (req, res) => {
    res.send("hi")
})

apiRouter.use("/auth", authRouter)
apiRouter.use("/users/:username/", userRouter)

export { apiRouter }

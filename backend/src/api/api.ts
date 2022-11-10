import { Router } from "express"
import authRouter from "./auth/auth"

const apiRouter = Router()

apiRouter.use("/auth", authRouter)

export { apiRouter }

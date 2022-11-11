import { Router } from "express"
import classesRouter from "../classes/classes"
import fs from "fs"

const userRouter = Router({ mergeParams: true })

userRouter.use("/classes/", classesRouter)

userRouter.post("/joinClass", (req, res) => {
    const classId = req.body.class
    const username = req.params.username

    let password
    try {
        password = fs.readFileSync(`storage/${classId}/password.txt`, {
            encoding: "utf8",
        })
    } catch {
        res.sendStatus(404)
        return
    }

    if (req.body.password !== password) {
        res.sendStatus(403)
        return
    }

    const userClasses = JSON.parse(
        fs.readFileSync(`storage/studentClasses.json`, { encoding: "utf8" })
    )

    const classManifest = JSON.parse(
        fs.readFileSync(`storage/${classId}/students.json`, {
            encoding: "utf8",
        })
    )

    if (userClasses[username].includes(classId)) {
        res.sendStatus(200)
        return
    }

    classManifest[username] = {
        forumScore: 0,
        notesScore: 0,
    }

    if (username in userClasses) {
        userClasses[username].push(classId)
    } else {
        userClasses[username] = [classId]
    }

    fs.writeFileSync(
        `storage/studentClasses.json`,
        JSON.stringify(userClasses),
        { encoding: "utf8" }
    )

    fs.writeFileSync(
        `storage/${classId}/students.json`,
        JSON.stringify(classManifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

export default userRouter

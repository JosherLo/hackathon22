import { Router } from "express"
import fs from "fs"

const authRouter = Router()

let logins = new Map<string, string>() // username, password (so secure!)
if (!fs.existsSync("users.json")) {
    fs.writeFileSync("users.json", JSON.stringify(Object.fromEntries(logins)), {
        encoding: "utf8",
    })
} else {
    // very, very secure
    logins = new Map<string, string>(
        Object.entries(
            JSON.parse(fs.readFileSync("users.json", { encoding: "utf8" }))
        )
    )
}

authRouter.get("/", (req, res) => {
    const info = req.query
    console.log(info)
    if (
        !info ||
        !info.name ||
        typeof info.name !== "string" ||
        !info.pass ||
        typeof info.pass !== "string"
    ) {
        res.sendStatus(400) // invalid request
        return
    }
    if (!logins.has(info.name)) {
        res.sendStatus(404) // not found
        return
    }
    if (logins.get(info.name) !== info.pass) {
        res.sendStatus(403) // forbidden
        return
    }
    res.sendStatus(200) // ok
})

authRouter.put("/", async (req, res) => {
    const info = req.body
    if (
        !info ||
        !info.name ||
        typeof info.name !== "string" ||
        !info.pass ||
        typeof info.pass !== "string"
    ) {
        res.sendStatus(400) // invalid request
        return
    }
    if (logins.has(info.name)) {
        res.sendStatus(409) // conflict
        return
    }
    logins.set(info.name, info.pass)
    fs.writeFile(
        "users.json",
        JSON.stringify(Object.fromEntries(logins)),
        { encoding: "utf8" },
        (error) => {
            if (error) {
                console.log(error)
            }
        }
    )

    res.sendStatus(200) // ok
})

export default authRouter

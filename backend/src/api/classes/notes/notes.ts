import { Router } from "express"
import fs from "fs"

const notesRouter = Router({ mergeParams: true })

notesRouter.get("/", (req, res) => {
    const classId = req.params.classId
    console.log(classId)

    let notes = {}

    try {
        const data = fs.readFileSync(`storage/${classId}/notes/manifest.json`, {
            encoding: "utf8",
        })
        notes = JSON.parse(data)
    } catch {}

    res.json({ notes })
})

notesRouter.put("/", (req, res) => {
    const classId = req.params.classId
    const username = req.params.username
    const bodyData: any = req.body
    if (!bodyData || !bodyData.markdown || !bodyData.name) {
        res.sendStatus(400)
        return
    }
    if (!bodyData.tags) {
        bodyData.tags = []
    }
    try {
        fs.writeFileSync(
            `storage/${classId}/notes/${bodyData.name}.md`,
            bodyData.markdown,
            { encoding: "utf8" }
        )
    } catch (err) {
        res.sendStatus(409)
        return
    }

    const noteInfo = { upVotes: [username], tags: bodyData.tags }
    let manifest = {}

    try {
        const content = fs.readFileSync(
            `storage/${classId}/notes/manifest.json`,
            { encoding: "utf8" }
        )
        manifest = JSON.parse(content)
    } catch {}

    manifest[bodyData.name] = noteInfo

    fs.writeFileSync(
        `storage/${classId}/notes/manifest.json`,
        JSON.stringify(manifest)
    )

    res.sendStatus(200)
})

notesRouter.patch("/", (req, res) => {
    const classId = req.params.classId
    const bodyData: any = req.body
    if (!bodyData || !bodyData.markdown || !bodyData.name) {
        res.sendStatus(400)
        return
    }
    if (!bodyData.tags) {
        bodyData.tags = "none"
    }
    try {
        fs.writeFileSync(
            `storage/${classId}/notes/${bodyData.name}.md`,
            bodyData.markdown,
            { flag: "r+", encoding: "utf8" }
        )

        const content = fs.readFileSync(
            `storage/${classId}/notes/manifest.json`,
            { encoding: "utf8" }
        )

        const manifest = JSON.parse(content)
        manifest[bodyData.name].tags = bodyData.tags

        fs.writeFileSync(
            `storage/${classId}/notes/manifest.json`,
            JSON.stringify(manifest)
        )

        res.sendStatus(200)
    } catch {
        res.sendStatus(404)
        return
    }
})

notesRouter.get("/:noteName", (req, res) => {
    const classId = req.params.classId
    const noteName = req.params.noteName

    try {
        const markdown = fs.readFileSync(
            `storage/${classId}/notes/${noteName}.md`,
            { encoding: "utf8" }
        )
        res.json({ markdown, name: noteName })
    } catch {
        res.sendStatus(404)
    }
})

notesRouter.delete("/:noteName", (req, res) => {
    const classId = req.params.classId
    const noteName = req.params.noteName

    try {
        fs.unlinkSync(`storage/${classId}/notes/${noteName}.md`)
    } catch {
        res.sendStatus(404)
        return
    }

    const content = fs.readFileSync(`storage/${classId}/notes/manifest.json`, {
        encoding: "utf8",
    })
    const manifest = JSON.parse(content)

    delete manifest[noteName]

    fs.writeFileSync(
        `storage/${classId}/notes/manifest.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

notesRouter.post("/:noteName/upvote", (req, res) => {
    const classId = req.params.classId
    const username = req.params.username
    const noteName = req.params.noteName

    const content = fs.readFileSync(`storage/${classId}/notes/manifest.json`, {
        encoding: "utf8",
    })
    const manifest = JSON.parse(content)

    if (manifest[noteName].upVotes.includes(username)) {
        res.sendStatus(400)
        return
    }
    manifest[noteName].upVotes.push(username)

    fs.writeFileSync(
        `storage/${classId}/notes/manifest.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

notesRouter.delete("/:noteName/upvote", (req, res) => {
    const classId = req.params.classId
    const username = req.params.username
    const noteName = req.params.noteName

    const content = fs.readFileSync(`storage/${classId}/notes/manifest.json`, {
        encoding: "utf8",
    })
    const manifest = JSON.parse(content)

    const index = manifest[noteName].upVotes.indexOf(username)

    if (index === -1) {
        res.sendStatus(404)
        return
    }

    manifest[noteName].upVotes.splice(index, 1)

    fs.writeFileSync(
        `storage/${classId}/notes/manifest.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )

    res.sendStatus(200)
})

export default notesRouter

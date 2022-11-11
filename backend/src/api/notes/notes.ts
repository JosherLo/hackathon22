import { Router } from "express"
import fs from "fs"

const notesRouter = Router()

notesRouter.get("/:classId(\\d+)", (req, res) => {
    const classId = req.params.classId

    let notes = {}

    try {
        const data = fs.readFileSync(`storage/${classId}/notes/manifest.json`, {
            encoding: "utf8",
        })
        notes = JSON.parse(data)
    } catch {
        try {
            fs.mkdirSync(`storage/${classId}`)
        } catch {}
        try {
            fs.mkdirSync(`storage/${classId}/notes`)
        } catch {}
        try {
            fs.mkdirSync(`storage/${classId}/questions`)
        } catch {}
        fs.writeFileSync(
            `storage/${classId}/notes/manifest.json`,
            JSON.stringify(notes)
        )
    }

    res.json({ notes })
})

notesRouter.put("/:classId(\\d+)", async (req, res) => {
    const classId = req.params.classId
    const bodyData: any = req.body
    if (!bodyData || !bodyData.markdown || !bodyData.name) {
        res.sendStatus(400)
        return
    }
    if (!bodyData.category) {
        bodyData.category = "none"
    }
    try {
        fs.writeFileSync(
            `storage/${classId}/notes/${bodyData.category}-&-${bodyData.name}.md`,
            bodyData.markdown,
            { flag: "wx", encoding: "utf8" }
        )
    } catch (err) {
        res.sendStatus(409)
        return
    }

    let manifest = {}
    manifest[bodyData.category] = [bodyData.name]

    try {
        const content = fs.readFileSync(
            `storage/${classId}/notes/manifest.json`,
            { encoding: "utf8" }
        )
        manifest = JSON.parse(content)
    } catch {
        try {
            fs.mkdirSync(`storage/${classId}`)
        } catch {}
        try {
            fs.mkdirSync(`storage/${classId}/notes`)
        } catch {}
        try {
            fs.mkdirSync(`storage/${classId}/questions`)
        } catch {}
        manifest = {}
    }

    if (bodyData.category in manifest) {
        manifest[bodyData.category].push(bodyData.name)
    } else {
        manifest[bodyData.category] = [bodyData.name]
    }

    await fs.writeFile(
        `storage/${classId}/notes/manifest.json`,
        JSON.stringify(manifest),
        (err) => {}
    )

    res.sendStatus(200)
})

notesRouter.patch("/:classId(\\d+)", (req, res) => {
    const classId = req.params.classId
    const bodyData: any = req.body
    if (!bodyData || !bodyData.markdown || !bodyData.name) {
        res.sendStatus(400)
        return
    }
    if (!bodyData.category) {
        bodyData.category = "none"
    }
    let code = 200
    try {
        fs.writeFileSync(
            `storage/${classId}/notes/${bodyData.category}-&-${bodyData.name}.md`,
            bodyData.markdown,
            { flag: "r+", encoding: "utf8" }
        )
    } catch {
        code = 404
    }
    res.sendStatus(code)
})

notesRouter.get("/:classId(\\d+)/:noteName", (req, res) => {
    const classId = req.params.classId
    const noteName = req.params.noteName
    const category = req.query.category || "none"

    try {
        const markdown = fs.readFileSync(
            `storage/${classId}/notes/${category}-&-${noteName}.md`,
            { encoding: "utf8" }
        )
        res.json({ markdown, name: noteName, category })
    } catch {
        res.sendStatus(404)
    }
})

notesRouter.delete("/:classId(\\d+)/:noteName", (req, res) => {
    const classId = req.params.classId
    const noteName = req.params.noteName
    const category = req.query.category || "none"

    try {
        fs.unlinkSync(`storage/${classId}/notes/${category}-&-${noteName}.md`)
    } catch {
        res.sendStatus(404)
        return
    }

    res.sendStatus(200)

    const content = fs.readFileSync(`storage/${classId}/notes/manifest.json`, {
        encoding: "utf8",
    })
    const manifest = JSON.parse(content)

    const files: string[] = manifest[category]
    files.splice(files.indexOf(noteName), 1)

    if (files.length === 0) {
        delete manifest[category]
    }

    fs.writeFileSync(
        `storage/${classId}/notes/manifest.json`,
        JSON.stringify(manifest),
        { encoding: "utf8" }
    )
})

export default notesRouter

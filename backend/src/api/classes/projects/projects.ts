import { Router } from "express"
import fs from "fs"
import { DateTime } from "luxon"

const projectsRouter = Router({mergeParams: true})

projectsRouter.get("/", (req, res) => {
    const classId = req.params.classId
    const user = req.params.username

    const projects = JSON.parse(fs.readFileSync(`storage/${classId}/projects.json`, {encoding: 'utf8'}))

    const projectsWithUser = Object.fromEntries(Object.entries(projects).filter(([projectName, info]) => {
        return info.people.includes(user)
    }))

    res.json({projects: projectsWithUser})
})

projectsRouter.put("/", (req, res) => {
    const classId = req.params.classId
    const user = req.params.username
    const name = req.body.name
    const desc = req.body.description
    const password = req.body.password

    const projects = JSON.parse(fs.readFileSync(`storage/${classId}/projects.json`, {encoding: 'utf8'}))

    if (name in projects) {
        res.sendStatus(409)
        return
    }

    projects[name] = {
        people: [user],
        description: desc,
        deadlines: {},
        password: password
    }

    fs.writeFileSync(`storage/${classId}/projects.json`, JSON.stringify(projects), {encoding: 'utf8'})

    res.sendStatus(200)
})

projectsRouter.post("/:projectName/join/", (req, res) => {
    const classId = req.params.classId
    const user = req.params.username
    const name = req.params.projectName
    const password = req.body.password

    const projects = JSON.parse(fs.readFileSync(`storage/${classId}/projects.json`, {encoding: 'utf8'}))

    if (!(name in projects)) {
        res.sendStatus(404)
        return
    }

    if (projects[name].password !== password) {
        res.sendStatus(403)
        return
    }

    projects[name].people.push(user)

    fs.writeFileSync(`storage/${classId}/projects.json`, JSON.stringify(projects), {encoding: 'utf8'})

    res.sendStatus(200)
})

projectsRouter.put("/:projectName/tasks/",(req, res) => {
    const classId = req.params.classId
    const projectName = req.params.projectName
    const taskName = req.body.name
    const deadline = req.body.deadline
    const desc = req.body.desc

    const projects = JSON.parse(fs.readFileSync(`storage/${classId}/projects.json`, {encoding: 'utf8'}))

    if (!(projectName in projects)) {
        res.sendStatus(404)
        return
    }

    projects[projectName].deadlines[taskName] = {
        deadline,
        description: desc,
        people: [],
        completed: false
    }

    fs.writeFileSync(`storage/${classId}/projects.json`, JSON.stringify(projects), {encoding: 'utf8'})

    res.sendStatus(200)
})

projectsRouter.put("/:projectName/tasks/:taskName/join",(req, res) => {
    const classId = req.params.classId
    const projectName = req.params.projectName
    const taskName = req.params.taskName
    const user = req.params.username

    const projects = JSON.parse(fs.readFileSync(`storage/${classId}/projects.json`, {encoding: 'utf8'}))

    if (!(projectName in projects) || !(taskName in projects[projectName].deadlines)) {
        res.sendStatus(404)
        return
    }

    projects[projectName].deadlines[taskName].people.push(user)

    fs.writeFileSync(`storage/${classId}/projects.json`, JSON.stringify(projects), {encoding: 'utf8'})

    res.sendStatus(200)
})

projectsRouter.put("/:projectName/tasks/:taskName/complete",(req, res) => {
    const classId = req.params.classId
    const projectName = req.params.projectName
    const taskName = req.params.taskName
    const user = req.params.username

    const projects = JSON.parse(fs.readFileSync(`storage/${classId}/projects.json`, {encoding: 'utf8'}))

    if (!(projectName in projects) || !(taskName in projects[projectName].deadlines)) {
        res.sendStatus(404)
        return
    }

    if (!projects[projectName].deadlines[taskName].people.includes(user)) {
        return res.sendStatus(403)
    }

    projects[projectName].deadlines[taskName].completed = true

    fs.writeFileSync(`storage/${classId}/projects.json`, JSON.stringify(projects), {encoding: 'utf8'})

    res.sendStatus(200)
})

export default projectsRouter
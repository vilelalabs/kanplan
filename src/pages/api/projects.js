
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const projects = await prisma.project.findMany()
        if (!projects) return res.status(404).json({ message: 'Projects not found' })
        const tasks = await prisma.task.findMany()
        if (!tasks) return res.status(404).json({ message: 'Tasks not found' })

        projects.forEach(project => {
            project.tasks = tasks.filter(task => task.projectId === project.id)
        })
        res.status(200).json(projects)
    }
    else if (req.method === 'POST') {
        const project = await prisma.project.create({
            data: {
                title: req.body.title
            }
        })
        res.status(201).json(project)
    }
}

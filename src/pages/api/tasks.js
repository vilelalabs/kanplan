
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const tasks = await prisma.task.findMany()
        if (!tasks) return res.status(404).json({ message: 'Tasks not found' })

        res.status(200).json(tasks)
    }

    else if (req.method === 'POST') {
        const task = await prisma.task.create({
            data: {
                title: req.body.title,
                projectId: req.body.projectId
            }
        })
        res.status(201).json(task)

    }
}

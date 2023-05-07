import { prisma } from "@/services/prismaClient";

export default async function handler(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: 'Invalid Request.' })
    }

    let userId;

    if (req.body.email) {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!user) return res.status(404).json({ message: 'User not found' })
        userId = user.id;
    }


    if (req.method === 'POST' && !req.body.title) {
        const tasks = await prisma.task.findMany(
            {
                orderBy: {
                    id: 'asc'
                },
                where: {
                    projectId: req.body.projectId
                }
            }
        )
        if (!tasks) return res.status(404).json({ message: 'Tasks not found' })

        res.status(200).json(tasks)
    }

    else if (req.method === 'POST') {

        const task = await prisma.task.create({
            data: {
                title: req.body.title,
                projectId: req.body.projectId,
                description: ''
            }
        })
        res.status(201).json(task)

    }

}

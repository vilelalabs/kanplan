import { prisma } from "@/services/prismaClient";

export default async function handler(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: 'Invalid Request.' })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    const userId = user.id;

    if (req.method === 'POST' && !req.body.title) {
        const projects = await prisma.project.findMany({
            where: {
                userId: userId
            }
        })

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
                title: req.body.title,
                userId: userId
            }
        })
        res.status(201).json(project)
    }
}

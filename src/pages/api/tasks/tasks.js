import { prisma } from "@/services/prismaClient";
import { requireUser, ownProject } from "@/lib/server/auth";

// POST { projectId } lists the tasks of one of the user's projects;
// POST { projectId, title } creates a task in it.
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' })
    }

    const user = await requireUser(req, res)
    if (!user) return

    const project = await ownProject(user, req.body?.projectId)
    if (!project) {
        return res.status(404).json({ message: 'Project not found.' })
    }

    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''

    if (!title) {
        const tasks = await prisma.task.findMany({
            orderBy: { id: 'asc' },
            where: { projectId: project.id }
        })
        return res.status(200).json(tasks)
    }

    const task = await prisma.task.create({
        data: {
            title,
            projectId: project.id,
            description: ''
        }
    })
    return res.status(201).json(task)
}

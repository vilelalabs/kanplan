import { prisma } from "@/services/prismaClient";
import { requireUser, ownTask } from "@/lib/server/auth";

const STATUSES = ['to-do', 'in-progress', 'done']

// DELETE removes the task; PUT updates title, description and/or status.
// Only tasks in the signed-in user's projects.
export default async function handler(req, res) {
    if (req.method !== 'DELETE' && req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed.' })
    }

    const user = await requireUser(req, res)
    if (!user) return

    const task = await ownTask(user, req.query.id)
    if (!task) {
        return res.status(404).json({ message: 'Task not found.' })
    }

    try {
        if (req.method === 'DELETE') {
            const deletedTask = await prisma.task.delete({ where: { id: task.id } })
            return res.status(200).json(deletedTask)
        }

        const { title, description, status } = req.body ?? {}
        const data = {}
        if (typeof title === 'string') data.title = title
        if (typeof description === 'string') data.description = description
        if (typeof status === 'string' && STATUSES.includes(status)) data.status = status

        const updatedTask = await prisma.task.update({
            where: { id: task.id },
            data
        })
        return res.status(200).json(updatedTask)

    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: 'Could not update the task.' })
    }
}

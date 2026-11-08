import { prisma } from "@/services/prismaClient";
import { requireUser, ownProject } from "@/lib/server/auth";

// DELETE removes the project (and its tasks); PUT renames it ({ title }), restores it
// ({ reset: "true" }) or archives it (empty body). Only the owner's projects.
export default async function handler(req, res) {
    if (req.method !== 'DELETE' && req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed.' })
    }

    const user = await requireUser(req, res)
    if (!user) return

    const project = await ownProject(user, req.query.id)
    if (!project) {
        return res.status(404).json({ message: 'Project not found.' })
    }

    try {
        if (req.method === 'DELETE') {
            const [, deletedProject] = await prisma.$transaction([
                prisma.task.deleteMany({ where: { projectId: project.id } }),
                prisma.project.delete({ where: { id: project.id } }),
            ])
            return res.status(200).json(deletedProject)
        }

        const { reset, title } = req.body ?? {}
        let data
        if (reset === "true") data = { archived: false }
        else if (typeof title === 'string' && title.trim()) data = { title: title.trim() }
        else data = { archived: true }

        const updatedProject = await prisma.project.update({
            where: { id: project.id },
            data
        })
        return res.status(200).json(updatedProject)

    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: 'Could not update the project.' })
    }
}

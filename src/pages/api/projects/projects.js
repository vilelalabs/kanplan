import { prisma } from "@/services/prismaClient";
import { requireUser } from "@/lib/server/auth";

// POST without title: the signed-in user's projects with their tasks.
// POST with title: creates a project for the signed-in user.
// The user always comes from the session (an e-mail in the body is ignored).
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' })
    }

    const user = await requireUser(req, res)
    if (!user) return

    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''

    if (!title) {
        const projects = await prisma.project.findMany({
            where: { userId: user.id },
            include: { tasks: true },
        })
        return res.status(200).json(projects)
    }

    const project = await prisma.project.create({
        data: {
            title,
            userId: user.id
        }
    })
    return res.status(201).json(project)
}

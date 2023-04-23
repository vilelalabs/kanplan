
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { id } = req.query
    const { title } = req.body

    if (req.method === 'DELETE') {
        try {
            const deletedProject = await prisma.project.delete({
                where: {
                    id: parseInt(id)
                }
            })
            res.status(200).json(deletedProject)

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    else if(req.method === 'PUT') {
        try {
            const updatedProject = await prisma.project.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title
                }
            })
            res.status(200).json(updatedProject)

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}
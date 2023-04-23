
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {id} = req.query

    if(req.method === 'DELETE'){
        const deletedProject = await prisma.project.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json(deletedProject)
    }
}
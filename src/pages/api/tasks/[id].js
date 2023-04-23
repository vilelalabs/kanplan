
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {id} = req.query

    if(req.method === 'DELETE'){
        const deletedTask = await prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json(deletedTask)
    }
}
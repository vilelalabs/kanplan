
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const tasks = await prisma.task.findMany()
    if(!tasks) return res.status(404).json({ message: 'Tasks not found' })
    
    res.status(200).json(tasks)
}

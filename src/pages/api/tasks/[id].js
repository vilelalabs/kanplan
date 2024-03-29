import { prisma } from "@/services/prismaClient";

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

    else if (req.method === 'PUT') {
        const { title } = req.body
        const { description } = req.body
        const {status} = req.body
        if (req.body.description === undefined) req.body.description = ''

        try {
            const updatedTask = await prisma.task.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title,
                    description,
                    status
                }
            })
            res.status(200).json(updatedTask)

        } catch (error) {
            res.status(400).json({message: error.message})
        }

    }
}
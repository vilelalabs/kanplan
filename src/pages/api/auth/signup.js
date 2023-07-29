import { hash } from "bcryptjs";
import { prisma } from "@/services/prismaClient";

export default async function handler(req, res) {

    try {
        if (req.method === 'POST') {
            if(!req.body) return res.status(400).json({ message: 'No form data.' })
            const { username, email, password } = req.body //username is 'name' in database

            //check for duplicated users
            const checkexisting = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            if (checkexisting) return res.status(409).json({ message: 'User already exists.' })

            const user = await prisma.user.create({
                data: {
                    name: username,
                    email: email,
                    password: await hash(password, 12)
                }
            })
            res.status(201).json(user)
        } else {
            res.status(404).json({ message: 'Method not allowed.' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
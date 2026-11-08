import { hash } from "bcryptjs";
import { prisma } from "@/services/prismaClient";
import { privacyRecord } from "@/lib/privacy";

export default async function handler(req, res) {

    try {
        if (req.method === 'POST') {
            if(!req.body) return res.status(400).json({ message: 'No form data.' })
            const { username, email, password, acceptPrivacy } = req.body //username is 'name' in database
            if (acceptPrivacy !== true) return res.status(422).json({ message: 'The Privacy Policy must be accepted.' })

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
                    password: await hash(password, 12),
                    ...privacyRecord("signup-checkbox"),
                }
            })
            //never send the password hash back
            res.status(201).json({ id: user.id, name: user.name, email: user.email })
        } else {
            res.status(404).json({ message: 'Method not allowed.' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
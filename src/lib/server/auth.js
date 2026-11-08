import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/services/prismaClient";

// User of the current session, or null after answering 401. Every API route that
// touches projects, tasks or the user must use this: never trust an e-mail or id
// sent in the request body.
export async function requireUser(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;
    const user = email ? await prisma.user.findUnique({ where: { email } }) : null;
    if (!user) {
        res.status(401).json({ message: "Sign in first." });
        return null;
    }
    return user;
}

// Project of this user, or null (also for invalid ids).
export async function ownProject(user, rawId) {
    const id = Number.parseInt(rawId, 10);
    if (!Number.isInteger(id)) return null;
    return prisma.project.findFirst({ where: { id, userId: user.id } });
}

// Task in one of this user's projects, or null.
export async function ownTask(user, rawId) {
    const id = Number.parseInt(rawId, 10);
    if (!Number.isInteger(id)) return null;
    return prisma.task.findFirst({ where: { id, Project: { userId: user.id } } });
}

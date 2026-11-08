import { prisma } from "@/services/prismaClient";
import { requireUser } from "@/lib/server/auth";
import { PRIVACY_POLICY_VERSION, privacyRecord } from "@/lib/privacy";

// GET: has the signed-in user accepted the current privacy policy?
// POST: records the acceptance given in the update dialog (PrivacyGate).
export default async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' })
    }

    const user = await requireUser(req, res)
    if (!user) return

    if (req.method === 'GET') {
        return res.status(200).json({
            version: PRIVACY_POLICY_VERSION,
            accepted: user.privacyPolicyVersion === PRIVACY_POLICY_VERSION,
        })
    }

    await prisma.user.update({ where: { id: user.id }, data: privacyRecord("reaccept") })
    return res.status(200).json({ version: PRIVACY_POLICY_VERSION, accepted: true })
}

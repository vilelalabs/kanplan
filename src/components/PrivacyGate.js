import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import translate from "@/services/translate";

// LGPD: signed-in users who have not accepted the current privacy policy (accounts
// created before it, or after a policy update) see this dialog once and must accept
// it or sign out. The acceptance is recorded by POST /api/privacy.
export default function PrivacyGate() {
    const { status } = useSession();
    const router = useRouter();
    const t = translate("privacyUpdate", router.locale);
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (status !== "authenticated" || router.pathname === "/privacy") return;
        let cancelled = false;
        fetch("/api/privacy")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => { if (!cancelled && data && !data.accepted) setOpen(true); })
            .catch(() => {});
        return () => { cancelled = true; };
    }, [status, router.pathname]);

    if (!open) return null;

    const accept = async () => {
        setSaving(true);
        setError(false);
        try {
            const res = await fetch("/api/privacy", { method: "POST" });
            if (!res.ok) throw new Error();
            setOpen(false);
        } catch {
            setError(true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 p-4" role="dialog" aria-modal="true" aria-labelledby="privacy-update-title">
            <div className="w-full max-w-lg flex flex-col gap-5 bg-gray-900 border border-gray-700 rounded-md p-6 sm:p-8 text-gray-300">
                <h2 id="privacy-update-title" className="text-2xl font-bold text-gray-50">{t.title}</h2>
                <p className="leading-relaxed">{t.message}</p>
                <p>
                    <Link href="/privacy" target="_blank" className="text-blue-500 hover:underline">{t.read}</Link>
                </p>
                {error && <p className="text-rose-500 text-sm">{t.error}</p>}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button type="button" onClick={() => signOut()} className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800">
                        {t.signOut}
                    </button>
                    <button type="button" onClick={accept} disabled={saving} className="px-4 py-2 rounded-md bg-blue-800 text-gray-50 hover:bg-blue-700 disabled:opacity-60">
                        {saving ? "..." : t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}

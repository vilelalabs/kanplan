import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import getPrivacy from "@/content/privacy";

// Public page (not in the middleware matcher): reachable without login, linked
// from the login and register pages and from the projects page.
export default function Privacy() {
    const router = useRouter();
    const p = getPrivacy(router.locale);

    return (
        <div className="flex flex-col">
            <Head>
                <title>{`Kanplan | ${p.title}`}</title>
            </Head>
            <div className="flex items-center justify-between mx-4 py-2">
                <Link href={'/'}><img src='/assets/logo.png' alt='Kanplan' className="sm:w-35 sm:h-20" /></Link>
                <LanguageSelector />
            </div>
            <main className="flex flex-col items-center gap-12 px-4 py-12">
                <Header />
                <article className="w-full max-w-3xl flex flex-col gap-6 bg-gray-900 rounded-md p-6 sm:p-10 text-gray-300">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-50">{p.title}</h2>
                        <p className="text-sm text-gray-400">{p.updated}</p>
                    </div>
                    <p className="leading-relaxed">{p.intro}</p>
                    {p.sections.map((s) => (
                        <section key={s.title} className="flex flex-col gap-2">
                            <h3 className="text-lg font-bold text-gray-50">{s.title}</h3>
                            {s.paragraphs?.map((text) => <p key={text} className="leading-relaxed">{text}</p>)}
                            {s.items && (
                                <ul className="list-disc pl-6 flex flex-col gap-1">
                                    {s.items.map((text) => <li key={text} className="leading-relaxed">{text}</li>)}
                                </ul>
                            )}
                        </section>
                    ))}
                </article>
                <button
                    type="button"
                    onClick={() => (window.history.length > 1 ? router.back() : router.push('/'))}
                    className="px-10 py-1 rounded-md bg-blue-800 text-gray-50 hover:bg-blue-700">
                    {p.back}
                </button>
            </main>
        </div>
    );
}

import { useRouter } from "next/router";
import translate from "@/services/translate";


export default function LanguageSelector() {
    const router = useRouter();
    const { locale } = router;
    let t = translate("languageSelector", locale)

    const handleLanguageChange = (e) => {
        const selectedLocale = e.target.value;
        router.replace(router.pathname, router.pathname, { locale: selectedLocale })
    };

    return (
        <div className="mx-4 sm:flex justify-between items-center gap-4">
            <div>
                {t.message}:
            </div>
            <select
                className="bg-blue-700 rounded-md"
                onChange={handleLanguageChange}
                value={locale}>
                <option value="en-US">English</option>
                <option value="pt-BR">Português</option>
            </select>
        </div>
    )
}


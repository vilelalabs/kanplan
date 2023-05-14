import { useRouter } from "next/router";
import enUS from "../../locales/bannerAchivedProjects/en-US";
import ptBR from "../../locales/bannerAchivedProjects/pt-BR";



export default function BannerArchivedProjects(props) {
    const router = useRouter();
    const { locale } = router;

    let t;
    switch (locale) {
        case 'en-US':
            t = enUS
            break;
        case 'pt-BR':
            t = ptBR
            break;
        default:
            t = enUS
            break;
    }
    return (
        <div className="w-screen flex items-center text-center justify-center bg-gray-500 bg-opacity-40 text-lg font-bold px-4 py-3">
            "{t.message}"
        </div>
    )
}


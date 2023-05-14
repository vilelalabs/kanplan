import { useRouter } from "next/router";
import enUS from "../../locales/header/en-US";
import ptBR from "../../locales/header/pt-BR";



export default function Header() {
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
        <>
            <div className="flex flex-col items-center gap-2 m-2">
                <h1 className="text-4xl sm:text-6xl font-bold text-center"> KANPLAN </h1>
                <p className="text-lg italic text-center">"{t.subtitle}"</p>
            </div>
        </>
    )
}
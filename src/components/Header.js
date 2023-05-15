import { useRouter } from "next/router";
import translate from "@/services/translate";



export default function Header() {
    const router = useRouter();
    const { locale } = router;

    let t = translate("header", locale)

    return (
        <>
            <div className="flex flex-col items-center gap-2 m-2">
                <h1 className="text-4xl sm:text-6xl font-bold text-center"> KANPLAN </h1>
                <p className="text-lg italic text-center">"{t.subtitle}"</p>
            </div>
        </>
    )
}
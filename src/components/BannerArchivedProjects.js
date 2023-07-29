import { useRouter } from "next/router";
import translate from "@/services/translate";


export default function BannerArchivedProjects(props) {
    const router = useRouter();
    const { locale } = router;

    let t = translate("bannerArchivedProjects", locale)
    return (
        <div className="w-screen flex items-center text-center justify-center bg-gray-500 bg-opacity-40 text-lg font-bold px-4 py-3">
            "{t.message}"
        </div>
    )
}


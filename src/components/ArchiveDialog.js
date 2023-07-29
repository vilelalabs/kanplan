import { useRouter } from "next/router";
import translate from "@/services/translate";
import { FaExclamation } from "react-icons/fa";


export default function ArchiveDialog(props) {
    const router = useRouter();
    const { locale } = router;

    let t = translate("archiveDialog", locale)
    
    const handleResult = (res) => {
        props.setArchiveResult(res)
        props.setShowArchiveDialog(false)
    }
    return (
        <div className="fixed inset-0 z-2 flex justify-center items-center">
            <div className="w-200 h-100 bg-yellow-400 text-black p-5 flex flex-col gap-5 rounded-lg">
                <div className="flex justify-between">
                    <h1>{t.title}</h1>
                    <FaExclamation size={30} />
                </div>
                <div>
                <p>- {t.messageL1}</p>
                <p>- {t.messageL2}</p>
                <p>- {t.messageL3}</p>
                </div>


                <div className="flex justify-center gap-10">
                    <button onClick={() => handleResult(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {t.cancelButton}
                    </button>
                    <button onClick={() => handleResult(true)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        {t.archiveButton}
                    </button>
                </div>

            </div>
        </div>
    )
}
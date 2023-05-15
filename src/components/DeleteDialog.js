import { useRouter } from "next/router";
import enUS from "../../locales/deleteDialog/en-US";
import ptBR from "../../locales/deleteDialog/pt-BR";

import { FaTimesCircle } from "react-icons/fa";


export default function DeleteDialog(props) {
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
    const handleResult = (res) => {
        props.setDeleteResult(res)
        props.setShowDeleteDialog(false)
    }
    return (
        <div className="fixed inset-0 z-2 flex justify-center items-center">
            <div className="w-200 h-100 bg-red-800 p-5 flex flex-col gap-5 rounded-lg">
                <div className="flex justify-between">
                    <h1>{t.title}</h1>
                    <FaTimesCircle size={30} />
                </div>
                <p>
                   {props.deleteType=='project'?t.message1:t.message2}
                </p>

                <div className="flex justify-center gap-10">
                    <button onClick={() => handleResult(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {t.cancelButton}
                    </button>
                    <button onClick={() => handleResult(true)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        {t.deleteButton}
                    </button>
                </div>

            </div>
        </div>
    )
}
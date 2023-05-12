
import { FaExclamation } from "react-icons/fa";


export default function ArchiveDialog(props) {

    const handleResult = (res) => {
        props.setArchiveResult(res)
        props.setShowArchiveDialog(false)
    }
    return (
        <div className="fixed inset-0 z-2 flex justify-center items-center">
            <div className="w-200 h-100 bg-yellow-400 text-black p-5 flex flex-col gap-5 rounded-lg">
                <div className="flex justify-between">
                    <h1>Are you sure you want to archive this project?</h1>
                    <FaExclamation size={30} />
                </div>
                <div>
                <p>- Archiving this project <strong>will remove it</strong> from your main projects list.</p>
                <p>- You can always find it in the <strong>archive page</strong>.</p>
                <p>- You <strong>CAN'T</strong> return this project to your main projects list or edit it.</p>
                </div>


                <div className="flex justify-center gap-10">
                    <button onClick={() => handleResult(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        CANCEL
                    </button>
                    <button onClick={() => handleResult(true)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        ARCHIVE
                    </button>
                </div>

            </div>
        </div>
    )
}
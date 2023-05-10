import { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";


export default function DeleteDialog(props) {

    const handleResult = (res) => {
        props.setDeleteResult(res)
        props.setShowDeleteDialog(false)
    }
    return (
        <div className="fixed inset-0 z-2 flex justify-center items-center">
            <div className="w-200 h-100 bg-red-800 p-5 flex flex-col gap-5 rounded-lg">
                <div className="flex justify-between">
                    <h1>Delete</h1>
                    <FaTimesCircle size={30} />
                </div>
                <p>
                    Are you sure you want to delete this {props.deleteType}?
                </p>

                <div className="flex justify-center gap-10">
                    <button onClick={() => handleResult(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        CANCEL
                    </button>
                    <button onClick={() => handleResult(true)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        DELETE
                    </button>
                </div>

            </div>
        </div>
    )
}
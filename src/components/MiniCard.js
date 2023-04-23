
import { updateTaskStatus } from "@/services/tasks";

import { FaTrashAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";


export default function MiniCard(props) {

    const title = props.task.title
    const status = props.task.status

    return (
        <div className="flex items-center justify-between w-80 h-16 bg-gray-200 text-black rounded-lg shadow-md p-4">
            {(status == 'done' || status == 'in-progress') && <FaArrowLeft
                className={`text-2xl cursor-pointer
                 ${status=='in-progress'?'hover:text-orange-400':'hover:text-blue-400'} hover:scale-125 transition duration-200 ease-in-out`}
                onClick={props.moveTaskToLeft}
            />}
            <div className="flex flex-col justify-center w-full overflow-hidden p-2">
                <h3 className="text-lg font-bold cursor-pointer"
                    onClick={props.openTask}>{title}
                </h3>
            </div>
            <div className="flex flex-row gap-4 pr-4">
                <FaTrashAlt className="hover:text-red-400 hover:scale-150 transition duration-200 ease-in-out"
                    onClick={props.deleteTask}
                />
            </div>
            {(status == 'to-do' || status == 'in-progress') && <FaArrowRight
                 className={`text-2xl cursor-pointer
                 ${status=='in-progress'?'hover:text-green-400':'hover:text-blue-400'} hover:scale-125 transition duration-200 ease-in-out`}
                onClick={props.moveTaskToRight}
            />}
        </div>
    );
}
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";


export default function MiniCard(props) {

    const title = props.task.title
    const status = props.task.status
    const isArchived = props.isArchived

    return (
        <div className="flex items-center justify-between w-72 h-min bg-gray-200 text-black rounded-lg shadow-md p-2">
            {(!isArchived && (status == 'done' || status == 'in-progress')) && <FaArrowUp
                className={`text-2xl cursor-pointer lg:transform lg:-rotate-90 
                 ${status == 'in-progress' ? 'hover:text-orange-400' : 'hover:text-blue-400'} hover:scale-125 transition duration-200 ease-in-out`}
                onClick={props.moveTaskToLeft}
            />}
            <div className="flex flex-col justify-center w-full px-2">
                <p className="text-sm cursor-pointer"
                    onClick={props.openTask}>{title}
                </p>
            </div>
            <div className="flex flex-row gap-4 pr-4">
                {!isArchived && <FaTrashAlt className="hover:text-red-400 hover:scale-150 transition duration-200 ease-in-out"
                    onClick={props.deleteTask}
                />}
            </div>
            {(!isArchived && (status == 'to-do' || status == 'in-progress')) && <FaArrowDown
                className={`text-2xl cursor-pointer lg:transform lg:-rotate-90
                 ${status == 'in-progress' ? 'hover:text-green-400' : 'hover:text-blue-400'} hover:scale-125 transition duration-200 ease-in-out`}
                onClick={props.moveTaskToRight}
            />}
        </div>
    );
}
import { GrDrag } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";

export default function MiniCard(props) {
    return (
        <div className="flex items-center justify-between w-64 h-16 bg-gray-200 text-black rounded-lg shadow-md pl-4">
            <h3 className="text-lg font-bold cursor-pointer"
                onClick={props.openTask}>{props.task.title}
            </h3>
            <div className="flex flex-row gap-4 pr-4">
                <FaTrashAlt className="hover:text-red-400 hover:scale-150 transition duration-200 ease-in-out"
                    onClick={props.deleteTask}
                />
                <GrDrag className="cursor-grab"/>
            </div>
        </div>
    );
}
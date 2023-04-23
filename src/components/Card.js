import { updateTaskDescription } from "@/services/tasks";
import { useState } from "react";
import { GrClose } from "react-icons/gr";


export default function Card(props) {

    const [taskDescription, setTaskDescription] = useState(props.task.description);

    const handleSaveDescription = () => {
        updateTaskDescription(props.task.id, taskDescription)
        props.closeCard();
    }
    return (
        <div className="absolute inset-x-1/2 transform -translate-x-1/2
                        flex flex-col items-centerjustify-center
                        w-96 bg-gray-100 bg-opacity-95 text-black rounded-lg
                        p-10 m-10 shadow-md gap-4">
            <div>
                <h3 className="text-lg font-bold ">{props.task.title}</h3>
                <GrClose className="absolute top-4 right-4 text-2xl hover:text-red-400 hover:scale-125 transition duration-200 ease-in-out"
                    onClick={props.closeCard}
                />
            </div>

            <textarea className="text-lg h-32 font-normal mt-10 bg-transparent border-gray-200 w-full p-2 text-black"
                type="text" placeholder="Insert Your description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className="flex w-full justify-end">
                <button className="bg-blue-800 hover:bg-blue-600 text-white font-bold
                                py-2 px-4 rounded mt-2 w-24 justify-right"
                    onClick={handleSaveDescription}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
import { updateTask } from "@/services/tasks";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import translate from "@/services/translate";
import { useRouter } from "next/router";

export default function Card(props) {
    const router = useRouter();
    const { locale } = router;
    let t = translate("card", locale);

    const [taskDescription, setTaskDescription] = useState(props.task.description);
    const [taskTitle, setTaskTitle] = useState(props.task.title);
    const isArchived = props.isArchived;

    const handleSaveChanges = () => {
        if (taskTitle === "") {
            alert("Please insert a title for your task");
            return;
        }

        updateTask(props.task.id, taskTitle, taskDescription).then((data) => {
            props.closeCard();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="absolute inset-x-1/2 transform -translate-x-1/2
                        flex flex-col items-centerjustify-center
                        w-96 bg-gray-100 bg-opacity-95 text-black rounded-lg
                        p-5 m-10 shadow-md gap-4">
            <div>
                <input className="text-md font-bold bg-transparent p-2 w-full text-black mt-5"
                    type="text" placeholder={t.nameTaskPlaceholder}
                    value={taskTitle}
                    disabled={isArchived}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />

                <GrClose className="absolute top-4 right-4 text-2xl hover:text-red-400 hover:scale-125 transition duration-200 ease-in-out"
                    onClick={props.closeCard}
                />
            </div>

            <textarea className="text-sm h-32 mt-5 bg-transparent p-2 text-black"
                type="text" placeholder={isArchived?"":t.descriptionPlaceholder}
                value={taskDescription}
                disabled={isArchived}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            {!isArchived &&<div className="flex w-full justify-end">
                <button className="bg-blue-800 hover:bg-blue-600 text-white font-bold
                                py-2 px-4 rounded mt-2 w-24 justify-right"
                    onClick={handleSaveChanges}
                >
                    {t.saveButton}
                </button>
            </div>}
        </div>
    );
}
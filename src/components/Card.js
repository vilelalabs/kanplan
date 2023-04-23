import { GrClose } from "react-icons/gr";

export default function Card(props) {


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
            <p className="text-lg font-normal mt-10"
            > {props.task.description}</p>
        </div>
    );
}
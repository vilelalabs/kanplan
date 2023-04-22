import { GrDrag } from "react-icons/gr";

export default function MiniCard(props) {
    return(
        <div className="flex items-center justify-center w-64 h-16 bg-gray-200 text-black rounded-lg shadow-md gap-4">
             <GrDrag className="mr-4"/>
            <h3 className="text-lg font-bold ">{props.task.title}</h3>
        </div>
    );
}
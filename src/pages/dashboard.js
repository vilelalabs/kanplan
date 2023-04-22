import { Task,Status } from "@/templates/task";

import MiniCard from "@/components/MiniCard"
import Link from "next/link"

import { FaHome } from "react-icons/fa"

export default function Dashboard(props) {


    const task = new Task("Título da tarefa", "DESCRIÇÃO DA TAREFA", Status.ToDo);
    const task2 = new Task("Título da tarefa2", "DESCRIÇÃO DA TAREFA", Status.InProgress);
    const task3 = new Task("Título da tarefa3", "DESCRIÇÃO DA TAREFA", Status.Done);
    const task5 = new Task("Título da tarefa5", "DESCRIÇÃO DA TAREFA", Status.ToDo);
    const task4 = new Task("Título da tarefa4", "DESCRIÇÃO DA TAREFA", Status.InProgress);

    const tasks = [task, task2, task3, task4, task5]

    const cardsCol1 = tasks.filter((task) => task.status === Status.ToDo)
    const cardsCol2 = tasks.filter((task) => task.status === Status.InProgress)
    const cardsCol3 = tasks.filter((task) => task.status === Status.Done)



    return (
        <main className={`flex min-h-screen flex-col space-y-16 pt-24 pl-8 pr-8`}>
            <div className="flex flex-row w-full items-center justify-between space-y-4 border-2 border-gray-200 p-6">
                <h1 className="text-4xl font-bold">Nome do Projeto</h1>
                <Link href="/">
                    <FaHome className="text-4xl hover:text-blue-400 hover:scale-125 transition duration-200 ease-in-out" />
                </Link>
            </div>
            <div>
                <ul className="flex flex-row justify-between space-x-4">
                    <li className="flex flex-col w-full space-y-4 border-2 border-gray-200 p-4">
                        <h2 className="text-center font-bold text-red-400">TO DO</h2>
                        <ul>
                            {cardsCol1.map((tasks, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <MiniCard task={tasks} />
                                </li>
                            ))}
                        </ul>

                    </li>
                    <li className="flex flex-col w-full space-y-4 border-2 border-gray-200 p-4">
                        <h2 className="text-center font-bold text-blue-400">IN PROGRESS</h2>
                        <ul>
                            {cardsCol2.map((tasks, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <MiniCard task={tasks} />
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="flex flex-col w-full space-y-4 border-2 border-gray-200 p-4">
                        <h2 className="text-center font-bold text-green-400" >DONE</h2>
                        <ul>
                            {cardsCol3.map((tasks, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <MiniCard task={tasks} />
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>





        </main>
    )
}

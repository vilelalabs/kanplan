import { getProjects, deleteProjects } from "@/services/projects";
import {getTasks, postTasks, deleteTasks} from "@/services/tasks";
import { Status } from "@/models/task";

import MiniCard from "@/components/MiniCard"
import Card from "@/components/Card";
import Link from "next/link"

import { FaHome } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa";

import { useState, useEffect } from "react";



export default function Dashboard(props) {

    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(0);
    const [showTaskCard, setShowTaskCard] = useState(false);

    const [newTaskTitle, setNewTaskTitle] = useState("")


    useEffect(() => {
        const projectId = parseInt(localStorage.getItem('project'))

        getProjects().then((data) => {
            const project = data.find((project) => project.id === projectId)
            setTitle(project.title)
        }).catch((err) => {
            console.log(err)
        })

        getTasks().then((data) => {
            const tasks = data.filter((task) => task.projectId === projectId)
            setTasks(tasks)
        })

    }, [])


    const cardsCol1 = tasks.filter((task) => task.status === Status.ToDo)
    const cardsCol2 = tasks.filter((task) => task.status === Status.InProgress)
    const cardsCol3 = tasks.filter((task) => task.status === Status.Done)

    const handleColClick = (taskId) => {
        setSelectedTask(taskId)
        setShowTaskCard(true)
    }

    const handleCloseCard = () => {
        setShowTaskCard(false)
    }

    const handleDeleteProject = () => {

        if (!confirm("Are you sure you want to delete this project?")) return
        const projectId = parseInt(localStorage.getItem('project'))
        
        tasks.forEach((task) => {
            deleteTasks(task.id).then(() => {
                console.log("Task deleted")
            }).catch((err) => {
                console.log(err)
            })
        })
        setTasks([])

        deleteProjects(projectId).then(() => {
            localStorage.removeItem('project')
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
        })
    }
    
    const handleAddNewTask = (e) => {
        if (e.key === "Enter") {
            const projectId = parseInt(localStorage.getItem('project'))

            postTasks(newTaskTitle,projectId).then((data) => {
                setTasks([...tasks, data])
            }).catch((err) => {
                console.log(err)
            })

            console.log(newTaskTitle)
            setNewTaskTitle("")
        }   
    }
    
    return (
        <main className={`flex min-h-screen flex-col space-y-16 pt-24 pl-8 pr-8`}>
            <div className="flex flex-row w-full items-center justify-between space-y-4 border-2 border-gray-200 p-6">
                <h1 className="text-4xl font-bold">{title}</h1>
                <div className="flex flex-row gap-8">
                    <div onClick={handleDeleteProject}>
                        <FaTrashAlt className="text-4xl hover:text-red-400 hover:scale-125 transition duration-200 ease-in-out" />
                    </div>
                    <Link href="/">
                        <FaHome className="text-4xl hover:text-blue-400 hover:scale-125 transition duration-200 ease-in-out" />
                    </Link>

                </div>
            </div>
            <div>
                <ul className="flex flex-row justify-between space-x-4">
                    <li className="flex flex-col w-full space-y-4 border-2 border-gray-200 p-4">
                        <h2 className="text-center font-bold text-red-400">TO DO</h2>
                        <ul>
                            {cardsCol1.map((task, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <div onClick={() => handleColClick(task.id)} >
                                        <MiniCard task={task} />
                                    </div>
                                </li>
                            ))}
                            <input className="text-center bg-transparent border-gray-200 w-full p-1 text-gray-100"
                                type="text" placeholder="Create New Task"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyDown={handleAddNewTask}
                            />
                        </ul>

                    </li>
                    <li className="flex flex-col w-full space-y-4 border-2 border-gray-200 p-4">
                        <h2 className="text-center font-bold text-blue-400">IN PROGRESS</h2>
                        <ul>
                            {cardsCol2.map((task, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <div onClick={() => handleColClick(task.id)} >
                                        <MiniCard task={task} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="flex flex-col w-full space-y-4 border-2 border-gray-200 p-4">
                        <h2 className="text-center font-bold text-green-400" >DONE</h2>
                        <ul>
                            {cardsCol3.map((task, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <div onClick={() => handleColClick(task.id)} >
                                        <MiniCard task={task} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>

            </div>

            {showTaskCard && <Card closeCard={handleCloseCard} task={tasks.find((task) => task.id === selectedTask)} />}




        </main>
    )
}

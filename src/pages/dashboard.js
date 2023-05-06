import { getProjects, deleteProjects, updateProjectTitle } from "@/services/projects";
import { getTasks, postTasks, deleteTasks, updateTaskStatus } from "@/services/tasks";
import { Status } from "@/models/task";

import MiniCard from "@/components/MiniCard"
import Card from "@/components/Card";
import Link from "next/link"

import { FaHome } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa";

import { useState, useEffect } from "react";

import { getSession, useSession, signOut } from "next-auth/react"
import Head from "next/head";

export default function Dashboard() {

    const { data: session } = useSession();
    const userEmail = session.user.email;

    const [title, setTitle] = useState("");
    const [firstTitle, setFirstTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(0);
    const [showTaskCard, setShowTaskCard] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [projectId,setProjectId] = useState(0)

    useEffect(() => {
        const selectedProjectIndex = localStorage.getItem("selectedProjectIndex")
        getProjects(userEmail).then((data) => {
            const project = data[selectedProjectIndex]
            setProjectId(project.id)

            setTitle(project.title)
            setFirstTitle(project.title)

        }).catch((err) => {
            console.log(err)
        })

    }, [showTaskCard])

    useEffect(() => {
        getTasks().then((data) => {
            const tasks = data.filter((task) => task.projectId === projectId)
            setTasks(tasks)
        }) .catch((err) => {
            alert("500 - Erro ao carregar as tarefas.")
        })
    },[projectId,showTaskCard])


    const cardsCol1 = tasks.filter((task) => task.status === Status.ToDo)
    const cardsCol2 = tasks.filter((task) => task.status === Status.InProgress)
    const cardsCol3 = tasks.filter((task) => task.status === Status.Done)

    const handleColClick = (taskId) => {
        if (showTaskCard) return;

        setSelectedTask(taskId)
        setShowTaskCard(true)
    }

    const handleCloseCard = () => {
        setShowTaskCard(false)

    }

    const handleUpdateProjectTitle = (e) => {
        if (title === "") {
            alert("Please insert a title for your project");
            setTitle(firstTitle)
            return;
        }

        updateProjectTitle(projectId, title);
    }

    const handleDeleteProject = () => {

        if (!confirm("Are you sure you want to delete this project?")) return

        tasks.forEach((task) => {
            deleteTasks(task.id);
        })
        setTasks([])

        deleteProjects(projectId).then(() => {
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleAddNewTask = (e) => {
        if (newTaskTitle === "") return;

        if (e.key === "Enter") {

            postTasks(newTaskTitle, projectId).then((data) => {
                setTasks([...tasks, data])
            }).catch((err) => {
                console.log(err)
            })
            setNewTaskTitle("")
        }
    }

    const deleteTask = (taskId) => {
        if (!confirm("Are you sure you want to delete this task?")) return
        deleteTasks(taskId).then(() => {
            const newTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(newTasks)
        }).catch((err) => {
            console.log(err)
        })
    }

    const moveTaskToRight = (taskId) => {
        const task = tasks.find((task) => task.id === taskId)
        let newStatus;
        newStatus = (task.status === Status.ToDo) ? newStatus = Status.InProgress : newStatus = Status.Done
        console.log(newStatus)
        updateTaskStatus(taskId, newStatus).then((data) => {
            const newTasks = tasks.map((task) => {
                if (task.id === taskId) {
                    return data
                }
                return task
            })
            setTasks(newTasks)
        }).catch((err) => {
            console.log(err)
        })
    }

    const moveTaskToLeft = (taskId) => {
        const task = tasks.find((task) => task.id === taskId)
        let newStatus;
        newStatus = (task.status === Status.Done) ? newStatus = Status.InProgress : newStatus = Status.ToDo
        updateTaskStatus(taskId, newStatus).then((data) => {
            const newTasks = tasks.map((task) => {
                if (task.id === taskId) {
                    return data
                }
                return task
            })
            setTasks(newTasks)
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleSignOut(){
        signOut()
    }

    return (
        <div>
            <Head>
                <title>Kanplan | Dashboard</title>
            </Head>
<div className="flex justify-between items-center text-center mx-4 py-2">
<Link href={'/'}><img src='/assets/logo.png' className="w-35 h-20" /></Link>
        <div className="flex flex-row items-center">
        <div className="details flex flex-col md:flex-row gap-2">
          <h5>Hi, {session.user.name}!</h5>
          <h5>({session.user.email})</h5>
        </div>

        <div className="flex justify-center">
          <button className="ml-4 px-4 py-1 rounded-sm bg-blue-700 text-gray-50" onClick={handleSignOut}>Sign Out</button>
        </div>
        </div>
        {/* <div className="flex justify-center">
          <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-blue-700 text-gray-50' >Profile</Link>
        </div> */}
      </div>
        <main className={`flex min-h-screen flex-col space-y-16 pt-24 pl-4 pr-4`}>
            <div className="flex flex-row w-full items-center justify-between gap-4 runded-sm border-2 border-gray-200 p-6">
                <input className="lg:text-4xl text-2xl font-bold bg-transparent h-16 mr-4 w-full text-gray-200 p-2"
                    type="text" placeholder="Name Your Project"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleUpdateProjectTitle}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.target.blur()
                        }
                    }}
                />

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
                <ul className="flex lg:flex-row flex-col justify-between gap-4">
                    <li className="flex flex-col w-full space-y-4 p-4">
                        <h2 className="text-center font-bold text-orange-400">TO DO</h2>
                        <ul>
                            {cardsCol1.map((task, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <div>
                                        <MiniCard
                                            task={task}
                                            openTask={() => handleColClick(task.id)}
                                            deleteTask={() => deleteTask(task.id)}
                                            moveTaskToRight={() => moveTaskToRight(task.id)} />
                                    </div>
                                </li>
                            ))}
                            <input className="text-center bg-transparent border-gray-200 w-full p-1 text-gray-100"
                                type="text" placeholder="Create New Task"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyDown={handleAddNewTask}
                                onBlur={() => setNewTaskTitle("")}

                            />
                        </ul>

                    </li>
                    <li className="flex flex-col w-full space-y-4 p-4">
                        <h2 className="text-center font-bold text-blue-400">IN PROGRESS</h2>
                        <ul>
                            {cardsCol2.map((task, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <div>
                                        <MiniCard
                                            task={task}
                                            openTask={() => handleColClick(task.id)}
                                            deleteTask={() => deleteTask(task.id)}
                                            moveTaskToLeft={() => moveTaskToLeft(task.id)}
                                            moveTaskToRight={() => moveTaskToRight(task.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="flex flex-col w-full space-y-4 p-4">
                        <h2 className="text-center font-bold text-green-400" >DONE</h2>
                        <ul>
                            {cardsCol3.map((task, key) => (
                                <li key={key} className="flex items-center justify-center p-2">
                                    <div>
                                        <MiniCard
                                            task={task}
                                            openTask={() => handleColClick(task.id)}
                                            deleteTask={() => deleteTask(task.id)}
                                            moveTaskToLeft={() => moveTaskToLeft(task.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>

            {showTaskCard && <Card closeCard={handleCloseCard} task={tasks.find((task) => task.id === selectedTask)} />}
        </main>
        </div>
    )
}


export async function getServerSideProps(req) {
    const session = await getSession(req)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }
    return {
        props: { session },
    }
}
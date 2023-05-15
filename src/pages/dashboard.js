import { getProjects, deleteProjects, archiveProjects, updateProjectTitle } from "@/services/projects";
import { getTasks, postTasks, deleteTasks, updateTaskStatus } from "@/services/tasks";
import { Status } from "@/models/task";
import MiniCard from "@/components/MiniCard"
import Card from "@/components/Card";
import Link from "next/link"
import { FaHome, FaTrashAlt } from "react-icons/fa"
import { HiInboxIn } from "react-icons/hi"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession, signOut } from "next-auth/react"
import Head from "next/head";
import ClockLoader from "react-spinners/ClockLoader";
import DeleteDialog from "@/components/DeleteDialog";
import ArchiveDialog from "@/components/ArchiveDialog";
import BannerArchivedProjects from "@/components/BannerArchivedProjects";
import translate from "@/services/translate";

export default function Dashboard() {

    const { data: session } = useSession();
    const userEmail = session.user.email;

    const [title, setTitle] = useState("");
    const [firstTitle, setFirstTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(0);
    const [showTaskCard, setShowTaskCard] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [projectId, setProjectId] = useState(0)
    const [loading, setLoading] = useState(true);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteResult, setDeleteResult] = useState(false)
    const [deleteType, setDeleteType] = useState("")
    const [taskIdToDelete, setTaskIdToDelete] = useState(0)

    const [showArchiveDialog, setShowArchiveDialog] = useState(false)
    const [archiveResult, setArchiveResult] = useState(false)
    const [archivedProject, setArchivedProject] = useState(false)


    const router = useRouter();
    const { locale } = router;
    let t = translate("dashboard", locale)

    useEffect(() => {
        setLoading(true)
        const selectedProjectIndex = localStorage.getItem("selectedProjectIndex")
        setArchivedProject(localStorage.getItem("archivedProject") === "true" ? true : false)
        getProjects(userEmail, archivedProject).then((res_data) => {
            const project = res_data[selectedProjectIndex]
            setProjectId(project.id)

            setTitle(project.title)
            setFirstTitle(project.title)
            setLoading(false)

        }).catch((err) => {
            console.log(err)
        })

    }, [showTaskCard, archivedProject])

    useEffect(() => {
        setLoading(true)
        getTasks(userEmail, projectId).then((res_data) => {
            const tasks = res_data.filter((task) => task.projectId === projectId)
            setTasks(tasks)
            setLoading(false)
        }).catch((err) => {
            alert("500 - Erro ao carregar as tarefas.")
        })
    }, [projectId, showTaskCard])


    useEffect(() => {
        if (!deleteResult) return
        setDeleteResult(false)
        if (deleteType === "project") {
            handleDeleteProject()
        }
        else if (deleteType === "task") {
            deleteTask(taskIdToDelete)
        }
    }, [showDeleteDialog])

    useEffect(() => {
        if (!archiveResult) return
        setArchiveResult(false)
        handleArchiveProject()
    }, [showArchiveDialog])


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
        setLoading(true)
        updateProjectTitle(projectId, title).then(() => {
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

    }
    const handleDeleteProject = () => {

        setLoading(true)
        tasks.forEach(async (task) => {
            await deleteTasks(task.id)
        })
        setLoading(false)
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
            setLoading(true)
            postTasks(newTaskTitle, projectId).then((res_data) => {
                setTasks([...tasks, res_data])
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
            setNewTaskTitle("")
        }
    }
    const deleteTask = (taskId) => {
        setLoading(true)
        deleteTasks(taskId).then(() => {
            const newTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(newTasks)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleArchiveProject = () => {
        setLoading(true)
        archiveProjects(projectId).then(() => {
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
        })
        setLoading(false)
    }

    const moveTaskToRight = (taskId) => {
        const task = tasks.find((task) => task.id === taskId)
        let newStatus;
        newStatus = (task.status === Status.ToDo) ? newStatus = Status.InProgress : newStatus = Status.Done
        setLoading(true)
        updateTaskStatus(taskId, newStatus).then((res_data) => {
            const newTasks = tasks.map((task) => {
                if (task.id === taskId) {
                    return res_data
                }
                return task
            })
            setTasks(newTasks)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    const moveTaskToLeft = (taskId) => {
        const task = tasks.find((task) => task.id === taskId)
        let newStatus;
        newStatus = (task.status === Status.Done) ? newStatus = Status.InProgress : newStatus = Status.ToDo
        setLoading(true)
        updateTaskStatus(taskId, newStatus).then((res_data) => {
            const newTasks = tasks.map((task) => {
                if (task.id === taskId) {
                    return res_data
                }
                return task
            })
            setTasks(newTasks)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleSignOut() {
        setLoading(true)
        router.push("/").then(() => {
            setLoading(false)
            signOut()
        })
    }

    return (
        <div>
            <Head>
                <title>Kanplan | Dashboard</title>
            </Head>
            <div className="flex justify-between items-center text-center mx-4 py-2">
                <Link href={'/'}><img src='/assets/logo.png' className="sm:w-35 sm:h-20" /></Link>
                <div className="flex flex-row items-center">
                    <div className="details flex flex-col md:flex-row gap-2">
                        <h5>{t.greetings}, {session.user.name}!</h5>
                        <h5>({session.user.email})</h5>
                    </div>

                    <div className="flex justify-center">
                        <button className="ml-4 px-4 py-1 rounded-sm bg-blue-700 text-gray-50" onClick={handleSignOut}>{t.signOutButton}</button>
                    </div>
                </div>
                {/* <div className="flex justify-center">
          <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-blue-700 text-gray-50' >Profile</Link>
        </div> */}
            </div>
            <main className={`flex min-h-screen flex-col space-y-16 pt-24 pl-4 pr-4`}>
                <div className="flex flex-row w-full items-center justify-between gap-4 runded-sm border-2 border-gray-200 p-6">
                    <input className="lg:text-4xl text-2xl font-bold bg-transparent h-16 mr-4 w-full text-gray-200 p-2"
                        type="text" placeholder={t.nameProjectPlaceholder}
                        value={title}
                        disabled={archivedProject}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleUpdateProjectTitle}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.target.blur()
                            }
                        }}
                    />

                    <div className="flex flex-row gap-8">
                        {!archivedProject && <div onClick={() => {
                            setShowArchiveDialog(true)
                        }}>
                            <HiInboxIn className="text-4xl hover:text-yellow-400 hover:scale-125 transition duration-200 ease-in-out" />
                        </div>}
                        {!archivedProject && <div onClick={() => {
                            setDeleteType("project")
                            setShowDeleteDialog(true)
                        }}>
                            <FaTrashAlt className="text-4xl hover:text-red-400 hover:scale-125 transition duration-200 ease-in-out" />
                        </div>}
                        <Link href="/">
                            <FaHome className="text-4xl hover:text-blue-400 hover:scale-125 transition duration-200 ease-in-out" />
                        </Link>
                    </div>
                </div>
                {archivedProject && <BannerArchivedProjects />}
                <div>
                    <ul className="flex lg:flex-row flex-col justify-between gap-4">
                        <li className="flex flex-col w-full space-y-4 p-4">
                            <h2 className="text-center font-bold text-orange-400 uppercase">{t.todo}</h2>
                            <ul>
                                {cardsCol1.map((task, key) => (
                                    <li key={key} className="flex items-center justify-center p-2">
                                        <div>
                                            <MiniCard
                                                task={task}
                                                isArchived={archivedProject}
                                                openTask={() => handleColClick(task.id)}
                                                deleteTask={() => {
                                                    setTaskIdToDelete(task.id)
                                                    setDeleteType("task")
                                                    setShowDeleteDialog(true)
                                                }}
                                                moveTaskToRight={() => moveTaskToRight(task.id)} />
                                        </div>
                                    </li>
                                ))}
                                {!archivedProject && <input className="text-center bg-transparent border-gray-200 w-full p-1 text-gray-100"
                                    type="text" placeholder={t.createNewTaskPlaceholder}
                                    value={newTaskTitle}
                                    disabled={archivedProject}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    onKeyDown={handleAddNewTask}
                                    onBlur={() => setNewTaskTitle("")}
                                />}
                            </ul>

                        </li>
                        <li className="flex flex-col w-full space-y-4 p-4">
                            <h2 className="text-center font-bold text-blue-400 uppercase">{t.inProgress}</h2>
                            <ul>
                                {cardsCol2.map((task, key) => (
                                    <li key={key} className="flex items-center justify-center p-2">
                                        <div>
                                            <MiniCard
                                                task={task}
                                                isArchived={archivedProject}
                                                openTask={() => handleColClick(task.id)}
                                                deleteTask={() => {
                                                    setTaskIdToDelete(task.id)
                                                    setDeleteType("task")
                                                    setShowDeleteDialog(true)
                                                }}
                                                moveTaskToLeft={() => moveTaskToLeft(task.id)}
                                                moveTaskToRight={() => moveTaskToRight(task.id)} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="flex flex-col w-full space-y-4 p-4">
                            <h2 className="text-center font-bold text-green-400 uppercase" >{t.done}</h2>
                            <ul>
                                {cardsCol3.map((task, key) => (
                                    <li key={key} className="flex items-center justify-center p-2">
                                        <div>
                                            <MiniCard
                                                task={task}
                                                isArchived={archivedProject}
                                                openTask={() => handleColClick(task.id)}
                                                deleteTask={() => {
                                                    setTaskIdToDelete(task.id)
                                                    setDeleteType("task")
                                                    setShowDeleteDialog(true)
                                                }}
                                                moveTaskToLeft={() => moveTaskToLeft(task.id)} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                {showTaskCard && <Card isArchived={archivedProject} closeCard={handleCloseCard} task={tasks.find((task) => task.id === selectedTask)} />}
            </main>
            {loading &&
                <span className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <ClockLoader color={"#ccc"} loading={loading} size={100} />
                </span>}
            {showDeleteDialog && <DeleteDialog deleteType={deleteType} setDeleteResult={setDeleteResult} setShowDeleteDialog={setShowDeleteDialog} />}
            {showArchiveDialog && <ArchiveDialog setArchiveResult={setArchiveResult} setShowArchiveDialog={setShowArchiveDialog} />}
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
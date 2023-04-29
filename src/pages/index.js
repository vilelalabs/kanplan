import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getProjects, postProjects } from "../services/projects"
import Header from "@/components/Header"

export default function Home() {
  const [projects, setProjects] = useState([])
  const [newProjectTitle, setNewProjectTitle] = useState("")

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data)
    })

  }, [])


  const handleAddNewProject = (e) => {
    if (newProjectTitle === "") return;

    if (e.key === "Enter") {
      // Add new project to DB through API
      postProjects(newProjectTitle).then((data) => {
        setProjects([...projects, data])
        setNewProjectTitle("")
      })
    }
  }


  return (
    <div>
      <Head>
        <title>Kanplan | Home</title>
      </Head>
    <main className="flex min-h-screen flex-col items-center space-y-16 p-24">
      <Header />
      <div>
        <ul className=" text-2xl flex flex-col items-center justify-center space-y-4">
          {projects.map((project, key) => (
            <li key={key} className="flex items-center justify-center space-x-4">
              <Link href={`/dashboard`} onClick={() => localStorage.setItem('project', project.id)}>
                {project.title}
              </Link>
            </li>
          ))}
          <input className="text-center bg-transparent border-gray-200 text-gray-100"
            type="text" placeholder="Name Your New Project"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            onKeyDown={handleAddNewProject}
          />
        </ul>
      </div>
    </main>
    </div>
  )
}

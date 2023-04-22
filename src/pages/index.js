import Link from "next/link"
import { useState,useEffect } from "react"
import getProjects from "../services/get-projects"

export default function Home() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data)
    })

  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center  space-y-16 p-24 `}
    >
      <div>
        <h1 className="text-6xl font-bold text-center"> KANPLAN </h1>
      </div>
      <div>
        <ul className=" text-2xl flex flex-col items-center justify-center space-y-4">
          {projects.map((project, key) => (
            <li key={key} className="flex items-center justify-center space-x-4">
              <Link href={`/dashboard`} onClick={() => localStorage.setItem('project', project.id)}>
                {project.title}
              </Link>
            </li>
          ))}

        </ul>
      </div>

    </main>
  )
}

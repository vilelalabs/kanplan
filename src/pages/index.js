import Project from "@/models/project"
import Link from "next/link"

export default function Home() {

  const project1 = new Project(1, "Projeto A", [])
  const project2 = new Project(2, "Projeto B", [])
  const project3 = new Project(3, "Projeto C", [])
  const project4 = new Project(4, "Projeto X", [])

  const projects = [project1, project2, project3, project4]


  return (
    <main
      className={`flex min-h-screen flex-col items-center  space-y-16 p-24 `}
    >
      <div>
        <h1 className="text-6xl font-bold text-center"> KANPLAN </h1>
      </div>
      <div>
        <ul className=" text-2xl flex flex-col items-center justify-center space-y-4">
          {projects.map((project) => (
            <li className="flex items-center justify-center space-x-4">
              <Link href={`/dashboard`}>
                {project.name}
              </Link>
            </li>
          ))}

        </ul>
      </div>

    </main>
  )
}

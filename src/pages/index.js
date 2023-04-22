import Link from "next/link"

export default function Home() {

  const projects = [ "Projeto 1", "Projeto 2", "Projeto 3"]

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
              {project}
              </Link>
            </li>
          ))}

        </ul>
      </div>

    </main>
  )
}

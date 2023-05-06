import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getProjects, postProjects } from "../services/projects"
import Header from "@/components/Header"

import { getSession, useSession, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();

  async function handleSignOut() {
    signOut()
  }

  return (
    <div>
      <Head>
        <title>Kanplan | Home</title>
      </Head>
      {session ? <User session={session} handleSignOut={handleSignOut} /> : <Guest />}
    </div>
  )
}


//Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20 h-screen">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-blue-700 text-gray-50' >Sign In</Link>
      </div>
    </main>
  )
}
//Authorized User
function User({ session, handleSignOut }) {
  const [projects, setProjects] = useState([])
  const [newProjectTitle, setNewProjectTitle] = useState("")

  useEffect(() => {
    getProjects(session.user.email).then((data) => {
      setProjects(data)
    })

  }, [])


  const handleAddNewProject = (e) => {
    if (newProjectTitle === "") return;

    if (e.key === "Enter") {
      postProjects(newProjectTitle, session.user.email).then((data) => {
        setProjects([...projects, data])
        setNewProjectTitle("")
      })
    }
  }

  return (
    <div className="flex flex-col ">
      <Head>
        <title>Kanplan | Home</title>
      </Head>

      <div className="flex justify-between items-center text-center mx-4 py-2">
        <Link href={'/'}><img src='/assets/logo.png' className="sm:w-35 sm:h-20" /></Link>
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
      <main className="flex h-screen flex-col items-center space-y-16 sm:pt-24">
        <Header />
        <div>
          <ul className="text-xl sm:text-2xl flex flex-col items-center justify-center space-y-4">
            {projects.map((project, key) => (
              <li key={key} className="flex items-center text-center justify-center space-x-4">
                <Link href={`/dashboard`} onClick={() => localStorage.setItem("selectedProjectIndex", key)}>
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }

}
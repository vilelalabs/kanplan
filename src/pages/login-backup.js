import Head from "next/head";

import Layout from "@/layout/layout";

export default function Login() {
    return (
        <Layout>
            <Head>
                <title>Kanplan | Login</title>
            </Head>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <form className="flex flex-col w-full p-4 lg:m-40 lg:mt-8 m:4 bg-gray-800 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">Login to access your Projects</h2>
                        <div className="flex flex-col mt-4 mr-6 ml-6">
                            <label className="mb-2 font-bold text-lg">Email</label>
                            <input className="p-2 text-black rounded-lg shadow-inner focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Email" />
                        </div>
                        <div className="flex flex-col  mt-4 mr-6 ml-6">
                            <label className="mb-2 font-bold text-lg">Password</label>
                            <input className="p-2  text-black  rounded-lg shadow-inner focus:outline-none focus:shadow-outline"
                                type="password" placeholder="Password" />
                        </div>

                        <button className="px-4 py-2  mt-20 mr-6 ml-6 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"  >
                            Login
                        </button>
                        <div className="flex items-center justify-between mt-10 ml-4">
                            <span>Don't have an account? <a className="font-bold text-blue-800 hover:text-blue-200" href="/">Sign up</a></span>
                            <a className="text-sm text-blue-600 hover:text-blue-500" href="/">Forgot your password?</a>
                        </div>
                    </form>
                </div>
            </main>
        </div>
        </Layout>
    )
}

// follow tutorial: https://www.youtube.com/watch?v=t0Fs0NO78X8 starting at 5 minutes
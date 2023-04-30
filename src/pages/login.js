import { useState } from "react";
import Head from "next/head";

import Layout from "@/layout/layout";
import Header from "@/components/Header";
import Link from "next/link";

import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";

import {  signIn, signOut } from "next-auth/react"

export default function Login() {
const [showPassword, setShowPassword] = useState(false);

async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' })
}

async function handleGithubSignin() {
    signIn('github', { callbackUrl: 'http://localhost:3000' })
}

    return (
        <Layout>
            <Head>
                <title>Kanplan | Login</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className="title">
                    <Header />
                </div>
                {/*form*/}
                <form className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold text-center"> Dive into your projects </h1>
                    <div className={styles.input_group}>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className={styles.input_text}
                        />
                        <span className="icon flex items-center px-4 text-white">
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    <div className={styles.input_group}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className={styles.input_text}
                        />
                        <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="icon flex items-center px-4 text-white">
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {/*login buttons*/}
                    <div className="input-button">
                        <button type="submit" className={styles.button}>
                            Login
                        </button>
                    </div>
                    <div className="input-button">
                        <button type="button" className={styles.button_custom} onClick={handleGoogleSignin}>Sign in with Google <Image src={'/assets/google.svg'} width={20} height={20} alt={'google logo'} /></button>
                    </div>
                    <div className="input-button">
                        <button type="button" className={styles.button_custom} onClick={handleGithubSignin}>Sign in with Github <Image src={'/assets/github.svg'} width={25} height={25} alt={'google logo'} /></button>
                    </div>
                </form>
                {/*bottom*/}
                <p className="text-center text-gray-400">
                    don't have an account? <Link href={'/register'} className="text-blue-700">Sign up</Link>
                </p>
            </section>
        </Layout>
    )
}



// follow tutorial: https://www.youtube.com/watch?v=t0Fs0NO78X8 starting at 52:04 minutes
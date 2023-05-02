import { useState } from "react";
import Head from "next/head";

import Layout from "@/layout/layout";
import Header from "@/components/Header";
import Link from "next/link";

import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";

import { signIn, signOut } from "next-auth/react"

import { useFormik } from "formik";
import  login_validate from "../lib/validate";

import { useRouter } from "next/router";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    //formik hook
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: login_validate,
        onSubmit,
    })

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
              callbackUrl: '/'
        })

        if(status.ok){
            console.log("OK")
            router.push(status.url)
        }
    }


    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: '/' })
    }

    async function handleGithubSignin() {
        signIn('github', { callbackUrl: '/' })
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
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <h1 className="text-2xl font-bold text-center"> Dive into your projects </h1>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email?'border-rose-600':''}`}>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className={styles.input_text}
                            {...formik.getFieldProps('email')}
                        />
                        <span className="icon flex items-center px-4 text-white">
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {/* {formik.errors.email && formik.touched.email? <span className="text-red-500 text-sm">{formik.errors.email}</span> : null} */}
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password?'border-rose-600':''}`}>                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="icon flex items-center px-4 text-white">
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {/* {formik.errors.password && formik.touched.password? <span className="text-red-500 text-sm">{formik.errors.password}</span> : null} */}
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



// follow tutorial: https://www.youtube.com/watch?v=t0Fs0NO78X8 starting at 1:53:40 minutes

//está sendo usado database Mongo, porém utilizareo o Postgres com o Prisma (https://authjs.dev/reference/adapter/prisma)
// alguns videos para essa integração:
// https://www.youtube.com/watch?v=zB7u1r0tc6o&pp=ygUjdXNpbmcgcHJvc21hIGFkYXB0ZXIgd290aCBuZXh0LmF1dGg%3D
// https://www.youtube.com/watch?v=vo2uq1cJV6w&pp=ygUjdXNpbmcgcHJvc21hIGFkYXB0ZXIgd290aCBuZXh0LmF1dGg%3D
// (3 minutos?)https://www.youtube.com/watch?v=VputqwS4btU&pp=ygUjdXNpbmcgcHJvc21hIGFkYXB0ZXIgd290aCBuZXh0LmF1dGg%3D



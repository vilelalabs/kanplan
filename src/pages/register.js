import { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Header from "@/components/Header";
import Link from "next/link";

import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from "react-icons/hi";


export default function Register() {
    const [showPassword, setShowPassword] = useState({ password: false, cpassword: false });
    return (
        <Layout>
            <Head>
                <title>Kanplan | Register</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className="title">
                    <Header />
                </div>
                {/*form*/}
                <form className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold text-center"> Register </h1>
                    <div className={styles.input_group}>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className={styles.input_text}
                        />
                        <span className="icon flex items-center px-4 text-white">
                            <HiOutlineUser size={25} />
                        </span>
                    </div>
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
                            type={showPassword.password ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className={styles.input_text}
                        />
                        <span
                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password})}
                            className="icon flex items-center px-4 text-white">
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    <div className={styles.input_group}>
                        <input
                            type={showPassword.cpassword ? "text" : "password"}
                            name="cpassword"
                            placeholder="confirm password"
                            className={styles.input_text}
                        />
                        <span
                            onClick={() => setShowPassword({ ...showPassword, cpassword: !showPassword.cpassword})}
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
                </form>
                {/*bottom*/}
                <p className="text-center text-gray-400">
                    Have an account? <Link href={'/login'} className="text-blue-700">Sign In</Link>
                </p>
            </section>
        </Layout >

    )
}
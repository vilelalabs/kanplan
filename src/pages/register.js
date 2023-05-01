import { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Header from "@/components/Header";
import Link from "next/link";

import styles from "@/styles/Form.module.css";
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useFormik } from "formik";
import {registerValidate} from "../lib/validate";

export default function Register() {
    const [showPassword, setShowPassword] = useState({ password: false, cpassword: false });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
        validate: registerValidate,
        onSubmit,
    })

    async function onSubmit(values) {
        console.log(values)
    }

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
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <h1 className="text-2xl font-bold text-center"> Register </h1>
                    <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username?'border-rose-600':''}`}>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className={styles.input_text}
                            {...formik.getFieldProps('username')}
                        />
                        <span className="icon flex items-center px-4 text-white">
                            <HiOutlineUser size={25} />
                        </span>
                    </div>
                    {/* {formik.errors.username && formik.touched.username? <span className="text-red-500 text-sm">{formik.errors.username}</span> : null} */}
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email?'border-rose-600':''}`}>                        <input
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
                            type={showPassword.password ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span
                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                            className="icon flex items-center px-4 text-white">
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {/* {formik.errors.password && formik.touched.password? <span className="text-red-500 text-sm">{formik.errors.password}</span> : null} */}
                    <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword?'border-rose-600':''}`}>                        <input
                            type={showPassword.cpassword ? "text" : "password"}
                            name="cpassword"
                            placeholder="confirm password"
                            className={styles.input_text}
                            {...formik.getFieldProps('cpassword')}
                        />
                        <span
                            onClick={() => setShowPassword({ ...showPassword, cpassword: !showPassword.cpassword })}
                            className="icon flex items-center px-4 text-white">
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {/* {formik.errors.cpassword && formik.touched.cpassword? <span className="text-red-500 text-sm">{formik.errors.cpassword}</span> : null} */}
                    {/*sign up buttons*/}
                    <div className="input-button">
                        <button type="submit" className={styles.button}>
                            Sign Up
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
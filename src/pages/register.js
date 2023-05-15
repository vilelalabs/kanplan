import { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "@/styles/Form.module.css";
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useFormik } from "formik";
import {registerValidate} from "../lib/validate";
import { useRouter } from "next/router";
import ClockLoader from "react-spinners/ClockLoader";
import translate from "@/services/translate";

export default function Register() {
    const [showPassword, setShowPassword] = useState({ password: false, cpassword: false });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {locale} = router;
    let t = translate("register", locale)

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
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }
        setLoading(true)
        const response = await fetch("/api/auth/signup", options)
        const data = await response.json()
        console.log(response.ok)
        if(response.ok){
            setLoading(false)
            router.push("/login")
        }
        else{
            setLoading(false)
            alert("Invalid register. Please try again.")
        }



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
                    <h1 className="text-2xl font-bold text-center"> {t.registerTitle} </h1>
                    <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username?'border-rose-600':''}`}>
                        <input
                            type="text"
                            name="username"
                            placeholder={t.usernamePlaceholder}
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
                            placeholder={t.passwordPlaceholder}
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
                            placeholder={t.confirmPasswordPlaceholder}
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
                            {t.registerButton}
                        </button>
                    </div>
                </form>
                {/*bottom*/}
                <p className="text-center text-gray-400">
                    {t.haveAccount} <Link href={'/login'} className="text-blue-700">{t.signIn}</Link>
                </p>
                {loading &&
                    <span className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <ClockLoader color={"#ccc"} loading={loading} size={100} />
                    </span>}
            </section>
        </Layout >

    )
}
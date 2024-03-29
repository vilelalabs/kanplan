import { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, getSession } from "next-auth/react"
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";
import ClockLoader from "react-spinners/ClockLoader";
import translate from "@/services/translate";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    let [loading, setLoading] = useState(false);

    const router = useRouter();
    const {locale} = router;
    
    let t = translate("login", locale)

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

        setLoading(true)
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        })
        setLoading(false)

        if (status.ok) {
            console.log("OK")
            router.push(status.url)
        }
        else {
            alert("Invalid credentials. Please try again.")
        }


    }


    async function handleGoogleSignin() {
        setLoading(true)
        await signIn('google', { callbackUrl: '/' })
        setLoading(false)
    }

    async function handleGithubSignin() {
        setLoading(true)
        await signIn('github', { callbackUrl: '/' })
        setLoading(false)
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
                    <h1 className="text-2xl font-bold text-center"> {t.loginTitle} </h1>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
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
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t.passwordPlaceholder}
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
                            {t.loginButton}
                        </button>
                    </div>
                    <div className="input-button">
                        <button type="button" className={styles.button_custom} onClick={handleGoogleSignin}>{t.signInWith} Google <Image src={'/assets/google.svg'} width={20} height={20} alt={'google logo'} /></button>
                    </div>
                    <div className="input-button">
                        <button type="button" className={styles.button_custom} onClick={handleGithubSignin}>{t.signInWith} Github <Image src={'/assets/github.svg'} width={25} height={25} alt={'google logo'} /></button>
                    </div>
                </form>
                {/*bottom*/}
                <p className="text-center text-gray-400">
                    {t.noAccount} <Link href={'/register'} className="text-blue-700">{t.signUp}</Link>
                </p>
                {loading &&
                    <span className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <ClockLoader color={"#ccc"} loading={loading} size={100} />
                    </span>}
            </section>
        </Layout>
    )
}

export async function getServerSideProps(req) {
    const session = await getSession(req)
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }
    return {
        props: { session },
    }
}
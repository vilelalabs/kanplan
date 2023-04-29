import styles from "@/styles/Layout.module.css"

import Image from "next/image";

export default function Layout({ children }) {
    return (
        <main className="p-8">
            <div className="flex h-screen">
                <div className="m-auto bg-slate-50 runded-md w-3/ h-3/4 grid lg:grid-cols-2">
                    <div className="right flex flex-col justify-evenly bg-gray-800">
                        {/* <Image src="/assets/image.png" width={500} height={100} alt="image" /> */}
                        <img src="/assets/image.png" alt="image" />
                    </div>
                    <div className="right flex flex-col justify-evenly bg-gray-900">
                        <div className= "text-center py-10">
                        {children}
                        </div>
                    </div>

                    
                </div>
            </div>
        </main>
    )

}
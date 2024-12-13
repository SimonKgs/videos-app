'use client';


import Link from "next/link"
import { GoVideo } from "react-icons/go"
import { IoIosVideocam } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { useAuthStore } from "@/store";
import LogoutButton from "../../auth/logout-button/logout-component";



export const Navbar = () => {

    const { user, isAuthenticated } = useAuthStore();


    const onLogout = () => {
        console.log("logout");
    }

    const onLogin = () => {
        console.log("login");
    }


    return (
        <nav className="flex px-5 justify-between items-center w-full border-b-2 border-gray-900 py-2">
            {/* LOGO */}
            <div>
                <Link href="/">
                    <span className="flex gap-4 text-xl items-center antialiased font-bold">
                        <GoVideo color="red" size={40} />
                        <p className="hidden sm:block">Videos App</p>
                    </span>
                </Link>
            </div>
            {/* PAGES */}
            {
                isAuthenticated &&
                    <div className="flex gap-4 sm:gap-8 md:gap-10">
                        <Link href={`/${user?.id}/videos`}>
                            <span className="flex gap-2 text-xl items-center antialiased font-bold">
                                <IoIosVideocam color="black" size={40} />
                                <p className="hidden md:block">Videos</p>
                            </span>
                        </Link>
                        <Link href={`/${user?.id}/upload`}>
                            <span className="flex gap-2 text-xl items-center antialiased font-bold">
                                <MdCloudUpload color="black" size={40} />
                                <p className="hidden md:block">Upload</p>
                            </span>
                        </Link>
                    </div>
            }

            {/* AUTH */}
            <LogoutButton />
        </nav>
    )
}

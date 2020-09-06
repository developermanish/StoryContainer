import React, { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

import { IoMdExit } from "react-icons/io";
import { checkToken } from "../../services/auth";


const Header = () => {
    useEffect(() => {
        async function fetchToken() {
            console.log("check")

            const localToken = localStorage.getItem('token');
            const result = await checkToken(localToken);
            if (result.message !== "Success") {
                Router.push('/');
                alert(result.message);
            }
        }
        fetchToken();
    }, [])

    const handleLogout = () => {
        localStorage.setItem('token', null);
    }
    return (
        <div className="navbar" style={{ boxShadow: '0px 2px 2px 2px #888888' }}>
            <ul className="flex justify-between">
                <div>
                    <ul className="p-4 list-none">
                        <li className="p-2" style={{ border: "2px solid", borderRadius: "50%" }}>Logo</li>
                    </ul>
                </div>
                <div >
                    <ul className="p-4 flex list-none">
                        <li><Link href="/home"><span className="cursor-pointer font-bold hover:text-green-500 ">Home</span></Link></li>
                        <li><Link href="/new"><span className="cursor-pointer font-bold hover:text-green-500 ml-20">New</span></Link></li>
                        <li className="ml-20"><Link href="/"><span className="cursor-pointer font-bold hover:text-green-500" onClick={() => handleLogout()}><IoMdExit /><span className="ml-1">Logout</span></span></Link></li>
                    </ul>
                </div>
            </ul>
        </div>
    )
}
export default Header;
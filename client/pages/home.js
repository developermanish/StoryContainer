import React from "react";
import Head from "next/head";

import Home from "../components/story/Home";
import Header from "../components/common/Header";

const HomePage = () => (
    <>
        <div className="">
            <Head>
                <title>Home</title>
            </Head>
            <Header />
        </div>
        <div className="my-5">
        <Home /> 
        </div> 
    </>
)
export default HomePage;
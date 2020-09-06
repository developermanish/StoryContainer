import React from "react"; 
import Head from "next/head";

import NewStory from "../components/story/NewStory";
import Header from "../components/common/Header";

const CreateStory = () => (
    <>
        <div>
            <Head>
                <title>New</title>
            </Head>
            <Header />
        </div>
        <div className="my-5">
            <NewStory/>
        </div>
    </>
);

export default CreateStory;
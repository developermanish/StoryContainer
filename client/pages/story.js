import React from "react"; 
import Head from "next/head";

import ViewStory from "../components/story/ViewStory";
import Header from "../components/common/Header";

const ViewStoryPage = () => (
    <>
        <div>
            <Head>
                <title>New</title>
            </Head>
            <Header />
        </div>
        <div className="my-5">
            <ViewStory/>
        </div>
    </>
)
export default ViewStoryPage;
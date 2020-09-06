import React from "react";
import Router from "next/router";
import Link from "next/link";

import StoryForm from "./components/StoryForm";

const NewStory = () => {
    const onSubmitSuccess = () => {
        Router.push("/home");
    };
    return (
        <div className="my-10 mt-20 ">
            <div className="max-w-3xl mx-auto">
                <StoryForm onSuccess={onSubmitSuccess}/>
            </div>
        </div>
    )
}
export default NewStory;
import React, {useReducer} from "react";

import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import Button from "../../common/Button";

import {submit} from "../../../services/story";

function storyReducer(state, action) {
    const {type, field, value} = action;
    if(type === "ON_CHANGE") {
        return {
            ...state, 
            [field]: value
        };
    }
    return state;
}

const storyInitState = {
    title: "",
    story: ""
}

const StoryForm = ({onSuccess}) => {
    const [state, dispatch] = useReducer(storyReducer, storyInitState);
    const {
        title, story
    } = state;

    const onChange = (e) => {
        dispatch({type: "ON_CHANGE", field: e.target.name, value: e.target.value});
    }
    
    const handleSubmitForm = async (state) => {
        console.log(state);
        const result = await submit(state);
        if(!result) {
            onSuccess();
        } else {
            console.log(result);
        }
    }
    return (
        <form>
            <div className="mb-2">
                <TextInput
                    type="text"
                    id="title"
                    name="title"
                    label="title"
                    required
                    value={title}
                    onChange={(e)=>onChange(e)}
                />
            </div>
            <div className="mb-2">
                <TextArea
                    label="Description"
                    value={story}
                    name="story"
                    rows="20"
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className="my-4 max-w-xs">
                <Button kind="solid" onClick={()=> {handleSubmitForm(state)}}>
                    Save
                </Button>
            </div>
        </form>
    )
}
export default StoryForm;
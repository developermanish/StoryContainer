import fetch from "./fetch";

export const submit = async (obj) => {
    const result = await fetch("POST", "/post_story/story_data", {
        body: {
            ...obj
        }
    });
    if(result.status !==201) {
        return {
            message: result.message
        };
    }
};

export const count = async () => {
    const result = await fetch("GET", "/get_stories/storyCount");
    if (result.status !== 200) {
        return { message: result.message };
    } else {
        return { count: result.count };
    }
}

export const allStories = async (pageNum) => {
    const result = await fetch("POST", "/get_stories/all_stories", {
        body: {
            pageNum: pageNum
        }
    });
    if (result.status !== 200) {
        return { message: result.message };
    } else {
        return result.data;
    }
}

export const getStory = async (id,views) => {
    const result = await fetch("PUT", `/get_stories/single_story?id=${id}`,{
        body:{
            count:views
        }
    }
    );
    if (result.status !== 200) {
        return { message: result.message };
    } else {
        return result.data;
    }
}
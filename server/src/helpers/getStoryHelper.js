const storiesPerPage = 5;
const Stories = require('../models/story');

const count = (filters) => {
    const query = filters.query ? filters.query : {};
    return Stories.countDocuments(query);
}
const getContactObject = (filters) => {
    const query = filters.query ? filters.query : {};
    const sortBy = filters.sort ? filters.sort : { _id: -1 };
    const pageNum = filters.pageNum ? filters.pageNum : 1;
    console.log(pageNum);

    return (
        Stories
            .find(query)
            .sort(sortBy)
            .skip(storiesPerPage * pageNum.pageNum - storiesPerPage)
            .limit(storiesPerPage)

    )
}

const getSpecificStoryObject = async (filters,count) => {

    const query = filters.query ? filters.query : {}; 
    return Stories.findOneAndUpdate({storyId:query.storyId},{$set:{count:count}})
}



module.exports = {
    count,
    getContactObject,
    getSpecificStoryObject
  };
  
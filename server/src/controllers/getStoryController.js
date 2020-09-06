const contactHelper = require('../helpers/getStoryHelper')

const getContactCount = () => {
    const filters = {};
    return contactHelper.count(filters);

}

const getPaginatedContact = (pageNum) => {
    const filters = {};
    filters.pageNum = pageNum;
    filters.sort = {
        name: 1
    }
    return contactHelper.getContactObject(filters)
}


const getSpecificStory = (id,count) => {
    const filters = {};
    filters.pageNum = pageNum;
    filters.query = {
        storyId: id
    }
    return contactHelper.getSpecificStoryObject(filters,count)
}


module.exports = {
    getContactCount,
    getPaginatedContact,
    getSpecificStory

}
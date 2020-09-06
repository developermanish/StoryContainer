const storyHelper = require("../helpers/storyHelper");

const saveData = (body) => {
    console.log(body)
    return storyHelper.createData(body)
}

module.exports = {
    saveData
}
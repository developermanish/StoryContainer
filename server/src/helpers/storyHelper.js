const Stories = require('../models/story');
const { v4: uuidv4 } = require('uuid');

function createData(body){
    var uuid=uuidv4();
    console.log(body)
    const storyData=new Stories({
        story:body.story,
        storyId:uuid,
        title:body.title
    })
   return storyData.save()
}
module.exports = {
  createData
};

const mongoose = require('mongoose');
const StorySchema = new mongoose.Schema({
    story: {
        type: String,
        default: ''
    },
    storyId: {
        type: String,
        default: ''
    },
    count: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Stories', StorySchema)
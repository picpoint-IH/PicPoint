const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    picPath: String,
    picName: String,
    country: String,
    province: String,
    city: String,

    location: { type: { type: String }, coordinates: [Number] }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
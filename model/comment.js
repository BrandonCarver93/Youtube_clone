const mongoose = require('mongoose');
const Joi = require('Joi');
const replySchema = new mongoose.Schema(
    {
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
    }
)
const commentSchema = new mongoose.Schema(
    {
        videoId: {type: String,},
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        replies: {type: [replySchema], default: []}
    }
)
/* 
const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = Joi.object({
        videoId: Joi.string().required(),
        text: Joi.string().required(),
        likes: Joi.number().default(0),
        dislikes: Joi.number().default(0),
     
    })
} */
const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Reply;
module.exports = Comment;
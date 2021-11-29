const mongoose = require('mongoose');
const joi = require('joi');
const replySchema = new mongoose.Schema(
    {
        commentId: {type: String},
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }
)
const commentSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
=======
        videoId: {type: String,},
>>>>>>> 8a13d7e565cc6162b8500a83a269fd716557ee68
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        replies: {type: [replySchema], default: []}
    }
)

function validateComment(comment) {
    const schema = joi.object({
        videoId: joi.string().required(),
        text: joi.string().required(),
        likes: joi.number().default(0),
        dislikes: joi.number().default(0),

     
    });
    return schema.validate(comment);
} 

function validateReply(reply) {
    const schema = joi.object({
        text: joi.string().required(),
        likes: joi.number().default(0),
        dislikes: joi.number().default(0)
     
    })
    return schema.validate(reply);
}

const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);

// module.exports = validateReply;
// module.exports = validateComment;


exports.Comment = Comment;
exports.validateComment = validateComment;
exports.commentSchema = commentSchema;
exports.Reply = Reply;
exports.validateReply = validateReply;
exports.replySchema = replySchema;
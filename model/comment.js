const mongoose = require('mongoose');
const Joi = require('joi');
const replySchema = new mongoose.Schema(
    {
        commentId: {type: String},
        text: {type: String, required: true},
        likes: {type: Number, default: 0, required: true},
        dislikes: {type: Number, default: 0, required: true},
    }
)
const commentSchema = new mongoose.Schema(
    {
        videoId: {type: String},
        text: { type: String, required: true},
        likes: {type: Number, default: 0, required: true},
        dislikes: {type: Number, default: 0, required: true},
        replies: {type: [replySchema], default: []}
    }
)

function validateComment(comment) {
    const schema = Joi.object({
        videoId: Joi.string().required(),
        text: Joi.string().required(),
    });
    return schema.validate(comment);
} 

function validateReply(reply) {
    const schema = Joi.object({
        text: Joi.string().required(),
    });
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
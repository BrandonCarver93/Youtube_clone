const {Comment, validateComment, replySchema} = require('../model/comment');
const {Reply, validateReply} = require('../model/comment')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
    const { error } = validateComment(req.body);
    if (error)
       return res.status(400).send(error);


        const comment = new Comment(
            {
            videoId: req.body.videoId,
            text: req.body.text,
            replies: []
            });

        await comment.save();

        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:videoId', async (req, res) => {
    try {
   
    const comments = await Comment.find({videoId: req.params.videoId});
    if (!comments){
        return res.status(400).send(`The product with id "${req.params.videoId}" does not exist.`);
    }
        
    return res.send(comments);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = Comment(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                replies: req.body.replies
            },
            { new: true }
        );

        if(!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            await comment.save();

            return res.send(comment);
    } catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
router.delete('/:id', async (req, res) => {
    try {
   
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment){
        return res.status(400).send(`The product with id "${req.params.id}" does not exist.`, comment);
    }
    }
    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
    return res.send("Comment deleted.")
});


router.post('/', async (req, res) => {
    
    try {
            
    const reply = new Reply(
        {
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes
        });
        await reply.save();
        return res.send(reply)
    }
    catch (ex) {
        return res.status(500).send(`internal Server Error ${ex}`);
    }
});
router.post('/', async (req, res) => {
    try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

    comment.replies.push(Reply);

    await comment.save();
    return res.send(comment)
    }
    catch (ex) {
        return res.status(500).send(`internal Server Error ${ex}`);
    }
});



module.exports = router;
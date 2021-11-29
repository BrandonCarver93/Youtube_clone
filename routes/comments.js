const {Comment, validateComment} = require('../model/comment');
const Comment = require('../model/comment');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
    const { error } = validateComment(req.body);
    if (error)
       return res.status(400).send(error);


        const comment = new Comment({
            videoId: req.body.videoId,
            text: req.body.text ,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            replies: req.body.replies
        });
        comment = new Comment({
            videoID: '=JGwWNGJdvx8',
            text: 'hotdogs',
            likes: 4,
            dislikes: 3, 
        });

        await comment.save();

        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
   
    const comment = await Comment.findById(req.params.id);
    if (!comment)
    return res.status(400).send(`The product with id "${req.params.Id}" does not exist.`);
    return res.send(comment);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validateComment(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
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
module.exports = router;
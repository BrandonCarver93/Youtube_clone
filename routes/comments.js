const Comment = require('../model/comment');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {

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
module.exports = router;
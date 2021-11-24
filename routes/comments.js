const comment = require('../model/comment');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {

        comment = new Comment({
            videoId: 'adfadfadf',
            text: 'hotdogs',
            likes: 4,
            dislikes: 3, 
            replies: 1,
        });

        await comment.save();

        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
module.exports = router;
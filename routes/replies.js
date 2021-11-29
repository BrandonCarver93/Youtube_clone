const {Reply, validateReplies} = require('../model/comment');
const express = require('express');
const router = express.Router();

router.post('/:id', async (req, res) => {
    try {
    const { error } = validateReplies(req.body);
    if (error)
       return res.status(400).send(error);

        const reply = new Reply({
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
        });

        await reply.save();

        return res.send(reply);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
module.exports = router;
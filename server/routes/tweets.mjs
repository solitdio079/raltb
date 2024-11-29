import express, { Router } from 'express'
import Tweets from '../models/tweets.mjs'

const router = Router()
router.use(express.json())
// create tweet
router.post("/", async (req, res) => {
    const { content } = req.body 
    const author = {id: req.user._id, name: req.user.fullName, picture: req.user.picture}
    try {
        const newTweet = new Tweets({ content, author })
        await newTweet.save()
        req.io.emit("tweet message", newTweet)
        return res.send({msg: 'Tweet cree!'})
    } catch (error) {
        return res.send({error: error.message})
    }
})

// get all tweets


export default router
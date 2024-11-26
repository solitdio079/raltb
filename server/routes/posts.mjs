import express, { Router } from 'express'
import Posts from '../models/posts.mjs'
import path from 'node:path'
import multer from 'multer'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import { postValidator } from '../schemas/postValidation.mjs'
import  fs from 'node:fs'
//import { equal } from 'node:assert'
const checkIfAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return res.send({ error: 'Access Denied!' })
  next()
}
// upload images
// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')
// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) 
    let extension = file.mimetype.split('/')[1]
    cb(null, 'post' + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage })
const router = Router()

//upload and return images' names
router.post("/postImages", checkIfAdmin,upload.array('images', 2), (req, res) => {
try {
     const fileNames = req.files.map((item) => item.filename)
     //console.log(fileNames)
     return res.send({ images: fileNames })
} catch (error) {
    return res.send({error: error.message})
}
   
})
// create Post
router.use(express.json())
router.post("/", checkIfAdmin, checkSchema(postValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: `${result.array()[0].msg}`})
    }
    // Shaping the post object to matched the model
    const data = matchedData(req)
    data.author = { id: req.user._id, name: req.user.fullName, picture:req.user.picture }
    data.category = { name: data.category }
    // Inserting the new Post object
    try {
        const newPost = new Posts(data)
        await newPost.save()
        return res.send({msg: `Post ${newPost._id} created!`})
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.get("/", async (req, res) => {
    const { cursor, limit } = req.query
    const query = {}
    if (cursor) {
        query._id = {$lt: cursor} 
    }
    try {
        const posts = await Posts.find(query, null, {
          limit: Number(limit),
          sort: { _id: -1 },
        })
        return res.send(posts)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})
router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const onePost = await Posts.findById(id)
        if (!onePost) return res.send({ error: `Post with id ${id} not found!` })
        return res.send(onePost)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})
router.get('/category/:name', async (req, res) => {
  const { name } = req.params
  const { cursor, limit } = req.query
  const query = { 'category.name': name }
  if (cursor) {
    query._id = { $lt: cursor }
  }
  try {
    const posts = await Posts.find(query, null, { limit: Number(limit) , sort: {_id: -1} })
    return res.send(posts)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

router.put("/:id",  checkIfAdmin, checkSchema(postValidator),async (req, res) => {
    const { id } = req.params
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ error: `${result.array()[0].msg}` })
    }
    // Shaping the post object to matched the model
    const data = matchedData(req)
    data.author = {
      id: req.user._id,
      name: req.user.fullName,
      email: req.user.email,
    }
    data.category = { name: data.category }
    try {
        // Get post to be updated
        const oldPost = await Posts.findById(id)
        if (!oldPost) return res.send({ error: `Post with ${id} not found!` })
        
        // Remove Images if necessary
        oldPost.images.forEach((item,index) => {
            if (item !=="" && item !== data.images[index]) {
                fs.unlinkSync(destination + item)
            } 

        })
        // Indert new Post in database
        try {
            await Posts.findByIdAndUpdate(id, data)
            return res.send({msg: "post updated!"})
        } catch (error) {
            return res.send({error: error.message})
        }
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
      // Get post to be updated
      const oldPost = await Posts.findById(id)
      if (!oldPost) return res.send({ error: `Post with ${id} not found!` })
      // Remove Images 
      oldPost.images.forEach((item) => {
          fs.unlinkSync(destination + item)
      })
        
        await Posts.findByIdAndDelete(id)
        return res.send({ msg: 'post supprime!' })
    } catch (error) {
         return res.send({ error: error.message })
    }
})
export default router
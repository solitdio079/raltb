import express, { Router } from 'express'
import Users from '../models/users.mjs'
import multer from 'multer'
import { userValidator } from '../schemas/userValidation.mjs'
import { validationResult, matchedData, checkSchema, check } from 'express-validator'
import fs from 'node:fs'
import sendgrid from '@sendgrid/mail'
import 'dotenv/config'
import path from 'node:path'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)


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
    cb(null, 'user' + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage })

const router = Router()

router.post("/", upload.single("picture"), checkSchema(userValidator), async (req, res) => {
  // get all the fields that are validated
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send({ error: result.array()[0].msg })
  // get all the fields that are validated
    const data = matchedData(req)
    
    if (data.department) {
        data.job += " " + data.department
        delete data.department
    }
  // Set the picture to uploaded data's name
  data.picture = req.file.filename

  try {
    const newUser = new Users(data)
    await newUser.save()
    return res.send({ msg: 'Compte creer avec succes!' })
  } catch (error) {
    return res.send({ error: error.message })
  }
})
// User update with picture

router.put("/:id", upload.single("picture"), checkSchema(userValidator),async (req, res) => {
      const { id } = req.params
      const result = validationResult(req)
      if (!result.isEmpty()) return res.send({ error: result.array()[0].msg })
      const data = matchedData(req)
      // get old User to get the picture
      const oldUser = await Users.findById(id)
    if (!oldUser) return res.send({ error: "Utilisateur n'existe pas!" })
    
    // Delete old image from files 
    fs.unlinkSync(destination + oldUser.picture)
      data.picture = req.file.filename
      try {
        await Users.findByIdAndUpdate(id, data)
        return res.send({ msg: 'Informations mis a jour!' })
      } catch (error) {
        return res.send({ error: error.message })
      }
    
})

router.use(express.json())

router.get("/", async (req, res) => {
    const { cursor, limit } = req.query
    const query = {}
    if (cursor) {
        query._id= {$gt: cursor}
    }
    try {
        const allUsers = await Users.find(query, null, { limit: Number(limit) })
        return res.send(allUsers)
    } catch (error) {
        return res.send({error: error.message})
    }
})
router.get('/search', async (req, res) => {
    
  const { q } = req.query
  const query = {$or:[{fullName: {$regex: `${q}`, $options: 'i'}},{role: {$regex: `${q}`, $options: 'i'}}] }
 
  try {
    const allUsers = await Users.find(query)
    return res.send(allUsers)
  } catch (error) {
    return res.send({ error: error.message })
  }
})
// Get all the members
router.get("/member", async (req, res) => {
  try {
    const members = await Users.find({ role: 'Membre' })
    return res.send(members)
  } catch (error) {
    return res.send({error: error.message})
  }
})
// Get Executive office
router.get("/executive", async (req, res) => {
   try {
     const execs = await Users.find({ role: {$nin: ['Membre', 'Guest', 'guest', 'membre']} })
     return res.send(execs)
   } catch (error) {
     return res.send({ error: error.message })
   }
})
router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const singleUser = await Users.findById(id)
        if (!singleUser) return res.send({ error: "Utlisateur n'existe pas!" })
        return res.send(singleUser)
    } catch (error) {
        return res.send({error: error.message})
    }
})

// User profile update without picture endpoint 
router.patch("/:id", checkSchema(userValidator), async (req, res) => {
    const { id } = req.params 
    const result = validationResult(req)
    if (!result.isEmpty()) return res.send({ error: result.array()[0].msg })
    const data = matchedData(req)
    // get old User to get the picture
    const oldUser = await Users.findById(id)
    if (!oldUser) return res.send({ error: 'Utilisateur n\'existe pas' })
    
    data.picture = oldUser.picture
    try {
        await Users.findByIdAndUpdate(id, data)
        return res.send({msg: 'Informations mis a jour!'})
    } catch (error) {
        return res.send({error: error.message})
    }
})



// update user role
router.patch("/role/:id", checkIfAdmin,async (req, res) => {
    const { id } = req.params 
    const {role} = req.body
    // get the old user from the database
    const oldUser = await Users.findById(id)
    if (!oldUser) return res.send({ error: "Utilisateur n'existe pas!" })
    oldUser.role = role
    try {
        await Users.findByIdAndUpdate(id, oldUser)
        const link = `http://malibusinessmachinetech.com/login`
        const msg = {
            to: oldUser.email,
            from: process.env.EMAIL,
            subject: 'Connectez-vous sur RALTB.com',
            text:
              `Salut ${oldUser.fullName}, vous etes maintenant ${role} du RALTB. Cliquez sur le lien ci-dessous pour vous connecter sur RALTB.com\r\n\r\n` +
              link,
            html:
              `<h3>Salut ${oldUser.fullName},</h3><p>vous etes maintenant ${role} du RALTB. Cliquez sur le lien ci-dessous pour vous connecter sur RALTB.com</p><p><a href="` +
              link +
              '">Connectez-vous</a></p>',
          }
        sendgrid.send(msg)
        return res.send({msg: 'Utilisateur mis a jour!'})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  // get the old user from the database
  const oldUser = await Users.findById(id)
  if (!oldUser) return res.send({ error: "Utilisateur n'existe pas!" })
  // delete files
 fs.unlinkSync(destination + oldUser.picture)
 try {
    await Users.findByIdAndDelete(id)
    return res.send({msg: 'Utilisateur supprime!'})
 } catch (error) {
    return res.send({error: error.message})
}
})

export default router
import express, { Router } from 'express'
import Category from '../models/categories.mjs'

const router = Router()

const checkIfAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return res.send({ error: 'Access Denied!' })
  next()
}
router.use(express.json())

// Create Category
router.post('/', checkIfAdmin, async (req, res) => {
  const { name } = req.body

  try {
    const newCategory = new Category({ name })
    await newCategory.save()
    return res.send({ msg: 'Category Created!' })
  } catch (error) {
    return res.send({ error: error.message })
  }
})

// Retrieve all Categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.find()

    return res.send(allCategories)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

// Delete Categories
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Category.findByIdAndDelete(id)
    return res.send({ msg: 'Deleted with success!' })
  } catch (error) {
    return res.send({ error: error.message })
  }
})

export default router

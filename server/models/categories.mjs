import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
})
const Category = mongoose.model('Category', categorySchema)

export default Category

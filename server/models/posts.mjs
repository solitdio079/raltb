import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    category: {
      name: String,
    
    },
    author: {
      id: mongoose.Types.ObjectId,
      name: String,
      picture: String,
    },
  },
  { timestamps: true }
)

const Posts = mongoose.model('Posts', postSchema)
export default Posts
import mongoose, { Schema } from 'mongoose'

const commentsSchema = new Schema({
  content: {
    type: String,
    required: true,
    },
    entity: {
        type: String,
        id: mongoose.Types.ObjectId,
        title: String
    },
  author: {
    id: mongoose.Types.ObjectId,
    name: String,
    picture: String,
  },
})

import mongoose, { Schema } from 'mongoose'

const internshipSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
        },
    applicants: {
       type: Array
    },
    author: {
      id: mongoose.Types.ObjectId,
        name: String,
      picture: String
    },
  },
  { timestamps: true }
)

const Internships = mongoose.model('Interships', internshipSchema)
export default Internships

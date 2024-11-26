import mongoose, { Schema } from 'mongoose'

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
        id: mongoose.Types.ObjectId,
        name: String,
        picture: String,
        
    }
  },
  { timestamps: true }
)

const Tweets = mongoose.model('Tweets', tweetSchema)
export default Tweets

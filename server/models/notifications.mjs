import mongoose, {Schema } from 'mongoose'


const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  target: {
    id: mongoose.Types.ObjectId,
    name: String,
    picture: String,
   
  },
  action: {
    type: String,
  },
})

const Notifications = mongoose.model('Notifications', notificationSchema)
export default Notifications
import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    fullName: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: 'Mali'
    },
    job: {
        type:String
    },
    picture: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'Guest'
    }
})


const Users = mongoose.model('Users', userSchema)

export default Users
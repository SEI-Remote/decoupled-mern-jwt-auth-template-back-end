import mongoose from 'mongoose'

export {
  User
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

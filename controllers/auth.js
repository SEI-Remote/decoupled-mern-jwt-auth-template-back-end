import jwt from 'jsonwebtoken'

import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

async function signup(req, res) {
  try {
    if (!process.env.SECRET) throw new Error('no SECRET in .env file')

    const user = await User.findOne({ email: req.body.email })
    if (user) throw new Error('Account already exists')

    const newProfile = await Profile.create(req.body)
    req.body.profile = newProfile._id
    const newUser = await User.create(req.body)

    const token = createJWT(newUser)
    res.status(200).json({ token })
  } catch (err) {
    console.log(err)
    try {
      if (req.body.profile) {
        await Profile.findByIdAndDelete(req.body.profile)
      }
    } catch (err) {
      return res.status(500).json({ err: err.message })
    }
    res.status(500).json({ err: err.message })
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new Error('User not found')
    
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (!isMatch) throw new Error('Incorrect password')

      const token = createJWT(user)
      res.json({ token })
    })
  } catch (err) {
    handleAuthError(err)
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findById(req.user._id)
    if (!user) throw new Error('User not found')

    user.comparePassword(req.body.pw, async (err, isMatch) => {
      if (!isMatch) throw new Error('Incorrect password')

      user.password = req.body.newPw
      await user.save()

      const token = createJWT(user)
      res.json({ token })
    })
  } catch (err) {
    handleAuthError(err)
  }
}

/* --== Helper Functions ==-- */

function handleAuthError(err) {
  console.log(err)
  const { message } = err
  if (message === 'User not found' || message === 'Incorrect password') {
    res.status(401).json({ err: message })
  } else {
    res.status(500).json({ err: message })
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' })
}

export { signup, login, changePassword }

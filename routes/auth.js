import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/change-password', checkAuth, authCtrl.changePassword)

export { router }

import express from 'express'
import { getCurrentUser, register } from '../controller/userController.js'
import { login } from '../controller/userController.js'
import { logout } from '../controller/userController.js'
import { isAuthorized } from '../middlewares/authentication.js'
import { updatejob } from '../controller/jobController.js'

const router = express.Router()
router.get('/getuser',isAuthorized,getCurrentUser)
router.post('/register',register)
router.post('/login',login)
router.get('/logout',isAuthorized,logout)


export default router 








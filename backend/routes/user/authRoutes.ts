import express from 'express'
const router = express.Router()
import { register, login } from '../../controller/authController'
import { userValidationRules, validate } from '../../middleware/userValidation';


router.post('/register', userValidationRules(), validate, register)
router.post('/login', login)


export default router;
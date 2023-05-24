import express from 'express';
import {
  register,
  login,
} from '../controllers/authController';
import {
  userLoginValidation,
  userRegisterValidation,
} from '../middleware/validation';

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public

router.post('/register', userRegisterValidation, register);

router.post('/login', userLoginValidation, login);


export default router;

import { Request, Response } from 'express';
import User from '../models/User';
import { response } from '../utils/responseUtils';
import {
  loginSchema,
  registerSchema,
} from '../validation/userValidationSchema';

export const userRegisterValidation = async(
  req: Request,
  res: Response,
  next: any
) => {
  const validation = registerSchema.validate(req.body);
  
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + ' is not a valid',
    });
  }
  let {email}= req.body;
  try {
     email = await User.findOne({ email });
  if (email ) {
      return response(res, 400, false, 'email already exists');
    }
  next();
  } catch (error) {
    console.log(error);
    return response(res, 500, false,'Internal server error');
  }
 
};

export const userLoginValidation = (req: Request, res: Response, next: any) => {
  const validation = loginSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + ' is not a valid',
    });
  }

  next();
};

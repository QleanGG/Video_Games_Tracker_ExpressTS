import { Router } from 'express';
import UserController from '../controllers/UserController';
import { userValidationRules, validate } from '../validators/userValidator';
import asyncHandler from '../utils/asyncHandler';


const router = Router();
const userController = new UserController

router.post('/', userValidationRules(), validate, asyncHandler(userController.register.bind(userController)));

export default router;
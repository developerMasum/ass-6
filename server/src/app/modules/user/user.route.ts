

import express from 'express';
import { userControllers } from './user.controler';
const router = express.Router();

router.post(
  '/create-user', userControllers.createUser,

);



export const UserRoutes = router;
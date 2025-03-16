import { Router } from "express";
import saveanswer from '../controllers/saveanswer.controller.js';

const userRoute = Router();
userRoute.post('/answers',saveanswer);
export default userRoute;

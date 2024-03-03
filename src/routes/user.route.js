import { Router } from "express";
import userController from "../controllers/user.controller.js";
import {validId, validUser} from "../middlewares/global.middlewares.js";

const route = Router()

route.post("/signup", userController.create);
route.get("/", userController.findAll);

route.use(validId, validUser)
route.get("/findById", userController.findById);
route.patch("/update",  userController.update)


export default route; 
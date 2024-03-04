import { Router } from "express";
import userController from "../controllers/user.controller.js";
import {validId, validUser} from "../middlewares/global.middlewares.js";

const route = Router()

route.post("/signup", userController.create);
route.get("/", userController.findAll);

route.use(validId, validUser)
route.get("/logado/:id?", userController.findUserById);
route.patch("/:id",  userController.update)


export default route; 
import { Router } from "express";
const route = Router()

import { create, findAll, topNews} from "../controllers/news.controller.js";
import { authMiddlewere } from "../middlewares/auth.middlewares.js";

route.post("/",authMiddlewere, create);
route.get("/", findAll);
route.get("/top", topNews);


export default route; 
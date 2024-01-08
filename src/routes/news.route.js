import { Router } from "express";
const route = Router();

import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  deleteNews,
  like,
} from "../controllers/news.controller.js";
import { authMiddlewere } from "../middlewares/auth.middlewares.js";

route.post("/", authMiddlewere, create);
route.get("/", findAll);
route.get("/search", searchByTitle);
route.get("/top", topNews);
route.get("/byUser", authMiddlewere, byUser);




route.patch("/like/:id", authMiddlewere, like);
route.patch("/:id", authMiddlewere,update);
route.get("/:id", authMiddlewere, findById);
route.delete("/:id", authMiddlewere, deleteNews);

export default route;

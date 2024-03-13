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
  addComment,
  delComment
} from "../controllers/news.controller.js";
import { authMiddlewere } from "../middlewares/auth.middlewares.js";

route.post("/create", authMiddlewere, create);
route.get("/", findAll);
route.get("/search", searchByTitle);
route.get("/top", topNews);
route.get("/byuser", authMiddlewere, byUser);




route.patch("/like/:id", authMiddlewere, like);
route.patch("/update/:id", authMiddlewere,update);
route.get("/:id", authMiddlewere, findById);
route.delete("/:id", authMiddlewere, deleteNews);
route.patch("/comment/:id", authMiddlewere, addComment);
route.patch("/comment/:idnews/:idComment", authMiddlewere, delComment);
export default route;

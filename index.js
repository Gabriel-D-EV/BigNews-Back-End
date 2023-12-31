import ex from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";

dotenv.config();

const app = ex();
const port = process.env.PORT || 3000;

connectDatabase()
app.use(ex.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);

//ROTA - 
//Method HTTP(CRUD)

  //GET - pega
  //POST - cria
  //PUT - altera full
  //PATCH - altera parte
  //DELETE - apaga

//Nome - um indentificador da rota
//Function | => - Responsavel por executar algun comando

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

import ex from "express";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";

const app = ex();
const port = 3000

connectDatabase()
app.use(ex.json());
app.use("/user", userRoute);

//ROTA - 
//Method HTTP(CRUD)

  //GET - prga
  //POST - cria
  //PUT - altera full
  //PATCH - altera parte
  //DELETE - apaga

//Nome - um indentificador da rota
//Function | => - Responsavel por executar algun comando

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
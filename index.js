const ex = require("express");
const userRoute = require("./src/routes/user.route")
const app = ex()

app.use("/", userRoute);

//ROTA - 
//Method HTTP(CRUD)

  //GET - prga
  //POST - cria
  //PUT - altera full
  //PATCH - altera parte
  //DELETE - apaga

//Nome - um indentificador da rota
//Function | => - Responsavel por executar algun comando

app.listen(3000)
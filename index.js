const ex = require("express");
const app = ex();

const userRoute = require("./src/routes/user.route");
const port = 3500


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
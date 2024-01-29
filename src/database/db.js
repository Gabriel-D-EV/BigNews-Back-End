import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Conectando Banco de dados...");
  mongoose
    .connect(process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas conectado!"))
    .catch((error) => console.log(error));
};

export default connectDatabase;

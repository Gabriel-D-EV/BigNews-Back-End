import mongoose from "mongoose";
import userServices from "../services/user.services.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id; 
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID Inválido!" });
    }
    
    return (req._id = id), next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req._id;

    const user = await userServices.findByIdUserService(id)

    console.log(user, id);

    if (!user) {
      return res.status(400).send({ message: "Não há Usuarios" });
    }

    req._id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

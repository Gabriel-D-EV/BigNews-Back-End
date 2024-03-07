import mongoose from "mongoose";
import userServices from "../services/user.services.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params._id;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID Inválido!" });
    }
    
    return (req.params.id = id), next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params._id;

    const user = await userServices.findByIdUserService(id)

    if (!user) {
      return res.status(400).send({ message: "Não há usuarios" });
    }

    req.params.id = id;
    req.params.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import userServices from "../services/user.services.js";

dotenv.config();

export const authMiddlewere = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .send({ message: "err1: Você não está autorizado!" });
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.length !== 2) {
      return res
        .status(401)
        .send({ message: "err2: Você não está autorizado!" });
    }

    if (schema !== "Bearer") {
      return res
        .status(401)
        .send({ message: "err3: Você não está autorizado!" });
    }

    Jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "err4: Token invalido!" });
      }
      console.log(decoded);

      const user = await userServices.findByIdService(decoded.id);

      if (!user || !user._id) {
        return res.status(401).send({ message: "err5: Token invalido!" });
      }

      req.userId = user._id;

      return next();
    });

    
  } catch {
    res.status(500).send({ message: err.message });
  }
};

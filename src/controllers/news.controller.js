import { createService, findAllService } from "../services/news.services.js";

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    
    if (!authorization) {
      return res.status(401).send({ message: "err1: Você não está autorizado!" });
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.length !== 2){
        return res.status(401).send({ message: "err2: Você não está autorizado!" });
    }


    if (schema !== "Bearer") {
      return res.status(401).send({ message: "err3: Você não está autorizado!" });
    }

    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: " Preencha todos os campos." });
    }

    await createService({
      title,
      text,
      banner,
      user: { _id: "658cf27a4b19ac353dec4fb5" },
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const news = await findAllService();
  if (news.length === 0) {
    return res.status(400).send({ message: "Não há Notícias registradas!" });
  }

  res.send(news);
};

export { create, findAll };

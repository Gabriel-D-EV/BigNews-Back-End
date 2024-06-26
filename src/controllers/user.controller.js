
import authServices from "../services/auth.services.js";
import userService from "../services/user.services.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar } = req.body;

    if (!name || !username || !email || !password || !avatar) {
      res.status(400).send({ message: " Preencha todos os campos." });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "ERRO ao criar Usuario." });
    }

    const token = authServices.generateToken(user._id);
    const id = user._id

    res.status(201).send({
      message: "Ususario criado com sucesso!"

    });

    return token, user, id ;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "Não há usuarios cadastrados!" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userService.findByIdUserService(id);

    if (!user) {
      return res.status(400).send({ message: "Não há usuarios cadastrados!" });
    }
    res.send(user);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
const updateUser = async (req, res) => {
  try {
    const { name, username, email, password, avatar } = req.body;

    if (!name && !username && !email && !password && !avatar) {
      res
        .status(400)
        .send({ message: "Preencha algum campo para atualizar!!" });
    }

    const id = req._id;

    const user = req.user;



    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar
    );

    return res.send({ message: "Usuario atualizado com sucesso!!!" });
  } catch (err) {
    
  }
};


export default { create, findAll, updateUser, findUserById };

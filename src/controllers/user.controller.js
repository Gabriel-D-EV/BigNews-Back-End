const userService = require("../services/user.services")

const create = async (req, res) => {
    const {name, username, email, password, avatar} = req.body;

    if (!name || !username || !email || !password || !avatar) {
        res.status(400).send({message: " Preencha todos os campos."})
    }
    
    const user = await userService.create(req.body);

    if (!user) {
        return res.status(400).send({message: "ERRO ao criar Usuario."});
    }

    res.status(201).send({
        message: "Ususario criado com sucesso!",
        user: {
            id: user._id,
            name,
            username,
            email,
            password,
            avatar,
        }
    })
};

module.exports = {create};

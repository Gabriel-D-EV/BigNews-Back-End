const userService = require("../services/user.services");
const mongoose = require("mongoose");


const create = async (req, res) => {
    const {name, username, email, password, avatar} = req.body;

    if (!name || !username || !email || !password || !avatar) {
        res.status(400).send({message: " Preencha todos os campos."})
    }
    
    const user = await userService.createService(req.body);

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

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if(users.length === 0) {
        return res.status(400).send({message: "Não há usuarios cadastrados!"});
    }
    
    res.send(users)
};

const findById = async (req, res) => {
    const id = req.params.id

/*     if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({message: "ID Inválido!"});
    } */

    const user = await userService.findByIdService(id)

 /*    if(!user) {
        return res.status(400).send({message: "Não há usuarios"});
    } */

    res.send(user)
};

const update = async (req, res) => {
    const {name, username, email, password, avatar} = req.body;

    if (!name && !username && !email && !password && !avatar) {
        res.status(400).send({message: " Preencha algum campo para atualizar."})
    }

    const id = req.params.id;

/*     if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({message: "ID Inválido!"});
    } */

    const user = await userService.findByIdService(id)

/*     if(!user) {
        return res.status(400).send({message: "Não há usuarios"});
    } */

    await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar
    );

    res.send({message: "Usuario atualizado com sucesso!!"});

};

module.exports = {create, findAll, findById, update};

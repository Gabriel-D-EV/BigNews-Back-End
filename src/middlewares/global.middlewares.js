const userService = require("../services/user.services");
const mongoose = require("mongoose");

const validId = (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({message: "ID Inválido!"});
    }

    req.id = id,

    next();
}

const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if(!user) {
        return res.status(400).send({message: "Não há usuarios"});
    }

    req.id = id;
    req.user = user;

    next();
}



module.exports = {validId, validUser};
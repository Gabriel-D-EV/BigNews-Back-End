const userService = require("../services/user.services");
const mongoose = require("mongoose");

const validId = (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({message: "ID Inválido!"});
    }
}

const validUser = (req, res, next) => {
    const id = req.params.id;

    const user = userService.findById(id);

    if(!user) {
        return res.status(400).send({message: "Não há usuarios"});
    }
}



module.exports = {validId, validUser};
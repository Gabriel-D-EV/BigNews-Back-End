const create = (req, res) => {
    const {name, username, email, password, avatar} = req.body;

    if (!name || !username || !email || !password || !avatar) {
        res.status(400).send({message: " Preencha todos os campos."})
    }
    

    res.status(201).send({
        message: "Ususario criado com sucesso!",
        user: {
            name,
            username,
            email,
            password,
            avatar
        }
    })
};

module.exports = {create};

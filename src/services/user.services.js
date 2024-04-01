import User from "../models/User.js";
import bcrypt from "bcrypt";

const createService = (body) => User.create(body)

const findAllService = () => User.find();

const findByIdUserService = (id) => User.findById(id)

const updateService = async (
    id,
    name,
    username,
    email,
    password,
    avatar) => {
    try {
        const hashPass = await bcrypt.hash(password, 10);
        const updateUser = await User.findOneAndUpdate({ _id: id }, { name, username, email, password: hashPass, avatar },
            { new: true }
        );
        return updateUser;
    } catch (error) {
        console.log(error);
    }
    }
    



export default  {
    createService, findAllService, findByIdUserService, updateService,
}

const {login, createUser} = require("../services/auth.service");

const loginUser = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await login(username, password);
        res.status(200).json(user);
    } catch (error) {
        if(error.message === "USER_NOT_FOUND" || error.message === "PASSWORD_INCORRECT") {
            return res.status(404).json({message: error.message});
        }
        next(error);
    }
}
const create = async(req, res, next) => {
    try {
        const { username, password, role } = req.body;
        const user = await createUser({username, password, role});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {loginUser, create};
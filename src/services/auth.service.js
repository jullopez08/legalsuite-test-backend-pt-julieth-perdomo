const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("PASSWORD_INCORRECT");
  } 
    const token = jsonwebtoken.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },


    };
  
};
const createUser = async ({username, password, role}) => {
    const existingUser = await User.findOne({where: {username}});
    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword, role});
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            is_active: user.is_active
        };
        
};

module.exports = {login, createUser};

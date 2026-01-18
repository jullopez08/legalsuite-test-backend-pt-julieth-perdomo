const jsonwebtoken = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No autorizado" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No autorizado" });
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "token no valido" });
  }
};
const authorize =(roles =[])=> {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "No autorizado" });
        }
        next();
    };
}

module.exports =  {authorize, authenticate} ;

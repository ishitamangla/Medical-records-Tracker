const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if(!token){
    console.log("token mising");
    return res.status(401).json({
      message:"unauthenticated access,token is mising"
    })
  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
      console.log("Invalid token");
      return res.status(401).json({
        message:"unauthenticated access,invalid token"
      })
    }
  }
module.exports = authMiddleware;

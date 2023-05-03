const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    const authHeaders=req.headers.token;
    if(authHeaders){
        const token=authHeaders.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC,(err,user)=>{
            console.log(user)
            if (err) return res.status(403).json(err);
            req.user=user;
            next();
        })
    } 
    else{
        return res.status(401).json("you are not authenticated");
    }
}
const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id==req.params.id || req.user.isAdmin){
            next();
        }
        else {res.status(403).json("You are not allow to do that!")} 
    })
     
}
module.exports={verifyToken,verifyTokenAndAuthorization}

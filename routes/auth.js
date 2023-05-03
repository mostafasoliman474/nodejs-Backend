const router = require("express").Router();
const User = require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");
router.post("/register", async(req, res) => {
    const newUser = new User({
      username:req.body.username,
      email:req.body.email, 
      password:CryptoJS.AES.encrypt(req.body.password,process.env.SEC_KEY).toString(),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      console.log(err); 
      res.status(500).json(err);
    } 
});
router.post("/LogIn",async (req,res)=>{
  try{
    const user=await User.findOne({username:req.body.username});
    !user && res.status(401).json("This user not founded");
    const hashedpassword=CryptoJS.AES.decrypt(
    user.password,
    process.env.SEC_KEY
    );
    const originalPassword=hashedpassword.toString(CryptoJS.enc.Utf8);
    originalPassword!==req.body.password && res.status(401).json("incorrect password");
    const accessToken=jwt.sign({
      id:user._id,
      isAdmin:user.isAdmin
    },process.env.JWT_SEC,{
      expiresIn:"3d"
    })
    const {password,...other}=user._doc;
    res.status(200).json({...other,accessToken});
  }catch(err){
    res.status(500).json(err); 
  }

})
module.exports=router;
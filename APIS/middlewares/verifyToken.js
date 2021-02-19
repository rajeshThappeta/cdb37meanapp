const jwt=require("jsonwebtoken")

require("dotenv").config()
const verifyToken=(req,res,next)=>{

    //token verification logic

    //get bearer token from header of req obj
    let tokenWithBearer=req.headers["authorization"]

    //if beare token is existed
    if(tokenWithBearer){

        //extract token by removing first 7 chars
        let token=tokenWithBearer.slice(7,tokenWithBearer.length)

        //verify with secret key
        jwt.verify(token,process.env.secret,(err,decoded)=>{

            if(err){
                return res.send({message:"Session expired..plz relogin to continue"})
            }
            else{
                next()
            }
        })
    }
    //if beare token is not existed
    else{
        return res.send({message:"Unauthorized access. Plz login to continue"})
    }


}



//export
module.exports=verifyToken;
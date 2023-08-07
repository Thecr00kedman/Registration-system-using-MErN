import {Router} from "express";
import User from "./userSchema.js";
import bcrypt from "bcryptjs"
import dotenv from 'dotenv'
import jwt  from "jsonwebtoken";

dotenv.config()


const secret_Key = process.env.SECRET_KEY
const router = Router();

const hashPass = async(pass)=>{
    return await bcrypt.hash(pass,10)
}
const comparePass = async (pass,databasePass)=>{
    return await bcrypt.compare(pass,databasePass)
}
router.post('/add',async(req,res)=>{
    try {

        const {email, name, password}= req.body;

        const user =await User.findOne({email})

        if (user){
            return res.json({error:'user already exist, try logging in'})

        }
    else if(!password || password.length<6){
        return res.json({warning:"password should be greater than 6 characters"})
    }
    const hashPassword = await hashPass(password)
     const newUser = new User({
        name, email, password:hashPassword
     })
     await newUser.save();
     return res.json({success:'Registered Successfully'})

}

    
     catch (error) {
        return res.status(500).json(error,'error while signing the user')
    }
})
router.post('/',async(req,res)=>{
    try {
        const {email, password} = req.body
    const user= await User.findOne({email})
    if(!user){
        return res.json({error:'DADAGIRI KREGA RE?'})
    }
    else{
        if(!email){
            return res.json({error:'email is required'})

        }
        else if(!password || password.length<6){
            return res.json({error:'Sahi se password daaal re.'})
        }
        else{
            const isValid = await comparePass(password,user.password)
            if(!isValid){
                return res.json({warning:"password is incorrect"})
            }
            else {
                const token = jwt.sign({email:user.email,id:user._id}, secret_Key, {expiresIn:'5d'})
                return res.json({success:'Logged in Successfully', token:token, userID:user._id, email:user.email})
            }
        }
    }

    } catch (error) {
        return res.status(500).json(error,'error while logging in the user')
    }
})

const verify = async(req,res,next)=>{
    try {
        const token= req.cookies.access_token;
        if(!token){
            return res.json({error:'error is token'});

        }
        else{
            next();
        }
    } catch (error) {
 
        res.json({error:error.message,message:'Error while verifying the token'})
    }
}
router.get('/verify',verify, async(req,res)=>{
    try {
        res.json({success:'user verified'})
    } catch (error) {
        res.status(500).json(error,'error while verifying the user')
    }
})
export default router;


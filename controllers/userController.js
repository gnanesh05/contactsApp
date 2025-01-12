import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from '../models/userModel.js'

export const GetUsers = async(req,res,next)=>{
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } 
    catch (error) {
        next(error)
    }
}

export const RegisterUser = async(req,res,next)=>{
    try {
        console.log(req.body)
        const {username,email, password} = req.body;
        if(!username || !email || !password){
            res.status(400)
            throw new Error("mandatory fields missing");
        }
        const user = await Users.findOne({email});
        if(user){
            res.status(400)
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await Users.create({username, email, password:hashedPassword});
        if(newUser){
            res.status(201).json({_id:newUser.id, email:user.email})
        }
        else{
            res.status(400)
            throw new Error("User data not valid");
        }
    }
     catch (error) {
        next(error)
    }
    
}

export const LoginUser = async(req,res,next)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400)
            throw new Error("Mandatory fields missing");
        }
        const existingUser = await Users.findOne({email})
        if(existingUser && (await bcrypt.compare(password , existingUser.password))){
            const accessToken = jwt.sign({
                user:{
                    username:existingUser.username,
                    email: existingUser.email,
                    id:existingUser.id

                }
            },process.env.SECRET_KEY, {expiresIn:"1m"});
            res.status(200).json({"accessToken":accessToken});
        }
        else{
            res.status(401);
            throw new Error("email or password invalid")
        }
    } 
    catch (error) {
     next(error)   
    }
}

export const GetCurrentUser = async(req,res,next)=>{
    res.status(200).json("current user")
}
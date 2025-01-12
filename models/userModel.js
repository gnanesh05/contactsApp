import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter a username"],
    },
    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:[true,"please enter a unique email"]
    },
    password:{
        type:String,
        required:[true,"please enter a password"]
    }
},{
    timestamps:true
});

export default mongoose.model("Users",userSchema);
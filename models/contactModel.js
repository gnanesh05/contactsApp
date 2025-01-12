import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please add contact name"]
    },
    email:{
        type:String,
        required:[true,"PLease add contact email address"]
    },
    phone:{
        type:String,
        required:[true,"Please add contact phone number"]
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    Timestamp:true,
});

export default mongoose.model("Contacts",contactSchema);

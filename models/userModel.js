import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:false,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

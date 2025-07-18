import mongoose from "mongoose";
const Schema = mongoose.Schema;

// This is simer user schema which will contain the name and points claimed by the user
const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    points : {
        type : Number,
        default : 0
    }
});

export const User = mongoose.model('User',userSchema);
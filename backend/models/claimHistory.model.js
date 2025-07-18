import mongoose from "mongoose";
const Schema = mongoose.Schema;

// In this sechema we will be keeping the points claimed at which time and for what user
const claimHistorySchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    pointsClaimed : {
        type : Number,
        required : true,
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
});

export const ClaimHistory = mongoose.model('ClaimHistory',claimHistorySchema);
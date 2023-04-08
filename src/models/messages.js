import mongoose from "mongoose";
const msgSchema = new mongoose.Schema({
    user: {type: String},
    msg: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model('msg', msgSchema);
export {Msg};
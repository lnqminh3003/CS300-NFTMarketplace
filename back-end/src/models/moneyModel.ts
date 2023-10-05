import mongoose from "mongoose";

const moneySchema = new mongoose.Schema({
    ownerAddress: { type: String , require:true},
    money : {type :String, require : true}
});

export default mongoose.model("money", moneySchema);

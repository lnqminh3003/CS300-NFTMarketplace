import mongoose from "mongoose";

const idMintedSchema = new mongoose.Schema({
    idNFT: { type: String, require: true },
});

export default mongoose.model("idminted", idMintedSchema);

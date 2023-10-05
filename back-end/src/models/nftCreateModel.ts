import mongoose from "mongoose";

const nftCreateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contentUrl: { type: String, required: true },
  description: { type: String },
  idNFT: { type: String, required: true },
  ownerAddress: { type: String },
});

export default mongoose.model("NFTCreate", nftCreateSchema);

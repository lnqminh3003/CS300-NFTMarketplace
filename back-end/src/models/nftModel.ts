import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contentUrl: { type: String, required: true },
  description: { type: String },
  idNFT: { type: String, required: true },
  price: { type: String },
  ownerAddress: { type: String },
});

nftSchema.index({ name: "text" });

export default mongoose.model("NFTs", nftSchema);

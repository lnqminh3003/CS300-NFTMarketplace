import { Router } from "express";

import nftModel from "../models/nftModel";
import log from "../utils/log";

const nftRoute = Router();

nftRoute.put("/create", async (req, res) => {
  try {
    log("create nft", req.body);

    const nft = await nftModel.create(req.body);
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.put("/create-many", async (req, res) => {
  try {
    log("create many nfts", req.body);

    const nfts = await nftModel.insertMany(req.body);
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.get("/get/:id", async (req, res) => {
  try {
    log("get nft", req.params.id);

    const nft = await nftModel.findById(req.params.id);
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.get("/getNFT/:address", async (req, res) => {
  try {
    log("get nft", req.params.address);
    const nft = await nftModel.find({ ownerAddress: req.params.address });
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.get("/get-many", async (req, res) => {
  try {
    log("get many nfts", req.body);

    const nfts = await nftModel.find({
      _id: { $in: req.body },
    });
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.get("/get-all", async (req, res) => {
  try {
    log("get all nfts");

    const nfts = await nftModel.find({});
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.post("/update/:id", async (req, res) => {
  try {
    log("update nft", req.params.id, req.body);

    const nft = await nftModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.delete("/delete/:id", async (req, res) => {
  try {
    log("delete nft", req.params.id);

    const nft = await nftModel.findOneAndDelete({'idNFT':req.params.id});
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});


nftRoute.post("/search/:text", async (req, res) => {
  try {
    log("search nft", req.params.text);

    const nft = await nftModel.find({ $text: { $search: req.params.text } });
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default nftRoute;

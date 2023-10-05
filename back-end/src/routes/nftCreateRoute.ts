import { Router } from "express";

import nftCreateModel from "../models/nftCreateModel";
import log from "../utils/log";

const nftCreateRoute = Router();

nftCreateRoute.put("/create", async (req, res) => {
  try {
    log("create nft", req.body);

    const nft = await nftCreateModel.create(req.body);
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftCreateRoute.put("/create-many", async (req, res) => {
  try {
    log("create many nfts", req.body);

    const nfts = await nftCreateModel.insertMany(req.body);
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftCreateRoute.get("/get/:id", async (req, res) => {
  try {
    log("get nft", req.params.id);

    const nft = await nftCreateModel.findById(req.params.id);
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftCreateRoute.get("/getNFT/:address", async (req, res) => {
  try {
    log("get nft", req.params.address);
    const nft = await nftCreateModel.find({'ownerAddress':req.params.address});
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});



nftCreateRoute.get("/get-many", async (req, res) => {
  try {
    log("get many nfts", req.body);

    const nfts = await nftCreateModel.find({
      _id: { $in: req.body },
    });
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftCreateRoute.get("/get-all", async (req, res) => {
  try {
    log("get all nfts");

    const nfts = await nftCreateModel.find({});
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftCreateRoute.post("/update/:id", async (req, res) => {
  try {
    log("update nft", req.params.id, req.body);

    const nft = await nftCreateModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftCreateRoute.delete("/delete/:id", async (req, res) => {
  try {
    log("delete nft", req.params.id);

    const nft = await nftCreateModel.findOneAndDelete({'idNFT':req.params.id});
    res.json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default nftCreateRoute;

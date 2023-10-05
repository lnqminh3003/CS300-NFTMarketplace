import { Router } from "express";
import idMintedModel from "../models/idMintedModel";
import log from "../utils/log";

const idMintedRoute = Router();

idMintedRoute.get("/get", async (req, res) => {
    try {
        log("get all id minted");

        const ids = await idMintedModel.find({});
        res.json(ids);
    } catch (err) {
        res.status(500).json(err);
    }
});

idMintedRoute.post("/update", async (req, res) => {
    try {
        log("update id minted", req.body);
        const idMinted = await idMintedModel.findByIdAndUpdate(
            "63a1d0b22c029b1c8024846b",
            req.body,
            {
                returnDocument: "after",
            }
        );
        res.json(idMinted);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default idMintedRoute;

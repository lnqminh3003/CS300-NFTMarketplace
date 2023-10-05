import { Router } from "express";
import moneyModel from "../models/moneyModel";
import log from "../utils/log";

const moneyRoute = Router();

moneyRoute.get("/get/:address", async (req, res) => {
    try {
        log("get money", req.params.address);
    
        const moneyUser = await moneyModel.find({'ownerAddress':req.params.address});
        res.json(moneyUser);
      } catch (err) {
        res.status(500).json(err);
      }
});

moneyRoute.put("/create", async (req, res) => {
    try {
      log("create money User", req.body);
  
      const money = await moneyModel.create(req.body);
      res.json(money);
    } catch (err) {
      res.status(500).json(err);
    }
  });
 
  moneyRoute.post("/update/:address", async (req, res) => {
    try {
      log("update money", req.params.address);
      let moneyUser = await moneyModel.findOneAndUpdate(
        { ownerAddress: req.params.address },
        req.body,
        {
          new: true,
        }
      );
      if (moneyUser == null || moneyUser == undefined) {
        moneyUser = await moneyModel.create({
          ...req.body,
          ownerAddress: req.params.address,
        });
      }
      res.json(moneyUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });


moneyRoute.delete("/delete/:address", async (req, res) => {
    try {
      log("delete money", req.params.address);
  
      const moneyUser = await moneyModel.findOneAndDelete({'ownerAddress':req.params.address});
      res.json(moneyUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default moneyRoute;

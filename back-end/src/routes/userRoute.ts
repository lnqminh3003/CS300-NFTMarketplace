import { Router } from "express";

import userModel from "../models/userModel";
import log from "../utils/log";

const userRoute = Router();

userRoute.put("/create", async (req, res) => {
  try {
    log("create user", req.body);

    const usr = await userModel.create(req.body);
    res.json(usr.toObject);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRoute;

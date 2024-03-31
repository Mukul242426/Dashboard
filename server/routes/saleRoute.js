import express from "express";
import {getData} from "../controllers/saleController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, getData);


export default router;

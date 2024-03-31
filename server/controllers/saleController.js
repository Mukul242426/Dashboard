import { Sale } from "../models/salesModel.js";
import { AppError } from "../utils/appError.js";

export const getData = async (req, res, next) => {
  
    try {
      const sales=await Sale.find({},{__v:0})
      res.status(200).json({
        success:true,
        results:sales.length,
        sales
      })
    } catch (error) {
      console.log(error)
      next(AppError(error.message, 400));
    }
  };
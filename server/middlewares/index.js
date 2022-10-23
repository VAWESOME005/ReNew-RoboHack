import { expressjwt } from "express-jwt";
import Product from "../models/product";

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const productOwner = async (req, res, next) => {
  let product = await Product.findById(req.params.productId).exec();
  let owner = product.postedBy._id.toString() === req.auth._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

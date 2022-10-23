import express from 'express'
import formidable from 'express-formidable'
import { create } from '../controllers/product';
import {requireSignin, productOwner} from "../middlewares"

const router = express.Router();

router.post("/create-product", requireSignin, formidable(), create);

module.exports = router
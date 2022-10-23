import Product from "../models/product";
import User from "../models/user";
const nodemailer = require("nodemailer");
import fs from "fs";

export const create = async (req, res) => {
  // console.log('reg fields', req.fields)
  // console.log("reg fiesdfdfsfdslds", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let product = new Product(fields);
    product.postedBy = req.auth._id;

    if (files.image) {
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    product.save((err, result) => {
      if (err) {
        console.log("product err", err);
        res.status(400).send("All fields are required");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const products = async (req, res) => {
  let all = await Product.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.json(all);
};

export const image = async (req, res) => {
  let product = await Product.findById(req.params.productId).exec();
  if (product && product.image && product.image.data !== null) {
    res.set("Content-Type", product.image.contentType);
    return res.send(product.image.data);
  }
};

export const sellerProducts = async (req, res) => {
  let all = await Product.find({ postedBy: req.auth._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Product.findByIdAndDelete(req.params.productId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let product = await Product.findById(req.params.productId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  console.log("SINGLE HOTELLLLL ------>", product);
  res.json(product);
};

export const update = async (req, res) => {
  // console.log('reg fields', req.fields)
  // console.log("reg fiesdfdfsfdslds", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Product.findByIdAndUpdate(req.params.productId, data, {
      new: true,
    })
      .select("-image.data")
      .exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error updating product. Please try again.");
  }
};

const contactEmail = nodemailer.createTransport({
  product: "gmail",
  auth: {
    user: "visheshv05@gmail.com",
    pass: "ketyrfyxvspishqd",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

export const msgPoster = async (req, res) => {
  // console.log(req);
  const poster = await User.findById(req.body[1]._id).exec();
  // console.log(poster)
  const name = "The Tutorz";
  const person_email = req.body[0].email;
  const person_name = req.body[0].name;
  const email = poster.email;
  const message =
    "Message them on Google Hangouts or on Google Chat to begin talking about availablities. Don't forget that every time you start you have to click Start Timer on your dashboard!";
  const mail = {
    from: name,
    to: email,
    subject: "Someone Wants To Get Tutored By You",
    html: `<h5>Hi ${poster.name}, ${person_name} on The Tutorz wants to get tutored by you.</h5>
           <h5>This is their email: ${person_email}</h5>
           <h5>${message}</h5>`,
  };

  const data = { tutees: req.body[0]._id };

  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    { $addToSet: data },
    {
      new: true,
    }
  ).exec();

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
};



import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    description: {
      type: String,
      required: "Description is required",
      maxlength: 10000,
    },
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    updatedDate: {
      type: Date,
    },
    reviews: {
      type: Array,
    },
    donate: {
        type: Boolean,
        required: "Type Of Product is required"
    }

  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

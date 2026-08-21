import mongoose from "mongoose";

const pincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
      index: true,
    },

    district: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Pincode",
  pincodeSchema
);
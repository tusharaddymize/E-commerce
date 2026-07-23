import mongoose from "mongoose";

const flashDealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "View All Deals",
    },

    buttonLink: {
      type: String,
      default: "/flash-deals",
    },

    endDate: {
      type: Date,
      required: true,
    },

    backgroundColor: {
      type: String,
      default: "#355E3B",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FlashDeal = mongoose.model(
  "FlashDeal",
  flashDealSchema
);

export default FlashDeal;
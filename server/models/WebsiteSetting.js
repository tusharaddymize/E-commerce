import mongoose from "mongoose";

/* ===========================
   Hero Banner Schema
=========================== */
const heroBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    buttonLink: {
      type: String,
      default: "/products",
    },

    active: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

/* ===========================
   Homepage Banner
=========================== */

const homepageBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

/* ===========================
   Contact
=========================== */

const contactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    workingHours: {
      type: String,
      default: "",
    },

    googleMap: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===========================
   Social
=========================== */

const socialSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===========================
   About
=========================== */

const aboutSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===========================
   Policies
=========================== */

const policySchema = new mongoose.Schema(
  {
    privacy: {
      type: String,
      default: "",
    },

    terms: {
      type: String,
      default: "",
    },

    shipping: {
      type: String,
      default: "",
    },

    refund: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===========================
   SEO
=========================== */

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    keywords: {
      type: String,
      default: "",
    },

    ogImage: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

/* ===========================
   Theme
=========================== */

const themeSchema = new mongoose.Schema(
  {
    primaryColor: {
      type: String,
      default: "#2563eb",
    },

    secondaryColor: {
      type: String,
      default: "#111827",
    },

    buttonColor: {
      type: String,
      default: "#2563eb",
    },

    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

/* ===========================
   Homepage Sections
=========================== */

const sectionSchema = new mongoose.Schema(
  {
    hero: {
      type: Boolean,
      default: true,
    },

    categories: {
      type: Boolean,
      default: true,
    },

    bestSelling: {
      type: Boolean,
      default: true,
    },

    newArrivals: {
      type: Boolean,
      default: true,
    },

    testimonials: {
      type: Boolean,
      default: true,
    },

    newsletter: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

/* ===========================
   Main Schema
=========================== */

const websiteSettingSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    heroBanners: [heroBannerSchema],

    homepageBanners: [homepageBannerSchema],

    homepageSections: {
      type: sectionSchema,
      default: () => ({}),
    },

    contact: {
      type: contactSchema,
      default: () => ({}),
    },

    social: {
      type: socialSchema,
      default: () => ({}),
    },

    about: {
      type: aboutSchema,
      default: () => ({}),
    },

    policies: {
      type: policySchema,
      default: () => ({}),
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    theme: {
      type: themeSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const WebsiteSetting =
  mongoose.models.WebsiteSetting ||
  mongoose.model("WebsiteSetting", websiteSettingSchema);

export default WebsiteSetting;
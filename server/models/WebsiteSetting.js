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
    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    whatsapp: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    googleMap: {
      type: String,
      default: "",
      trim: true,
    },

    businessHours: {
      type: String,
      default: "",
      trim: true,
    },

    supportHours: {
      type: String,
      default: "",
      trim: true,
    },

    heading: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
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
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    twitter: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    youtube: {
      type: String,
      default: "",
      trim: true,
    },

    whatsapp: {
      type: String,
      default: "",
      trim: true,
    },

    telegram: {
      type: String,
      default: "",
      trim: true,
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

/* ===========================
   About
=========================== */



const aboutSchema = new mongoose.Schema(
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

    mission: {
      type: String,
      default: "",
      trim: true,
    },

    vision: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    customers: {
      type: Number,
      default: 0,
    },

    projects: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

/* ===========================
   Policies
=========================== */

const policySchema = new mongoose.Schema(
  {
    privacyPolicy: {
      type: String,
      default: "",
      trim: true,
    },

    termsConditions: {
      type: String,
      default: "",
      trim: true,
    },

    refundPolicy: {
      type: String,
      default: "",
      trim: true,
    },

    shippingPolicy: {
      type: String,
      default: "",
      trim: true,
    },

    cancellationPolicy: {
      type: String,
      default: "",
      trim: true,
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
      default: "#355E3B",
    },

    secondaryColor: {
      type: String,
      default: "#1E3422",
    },

    accentColor: {
      type: String,
      default: "#f59e0b",
    },

    buttonColor: {
      type: String,
      default: "#355E3B",
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    fontFamily: {
      type: String,
      default: "Inter",
    },

    borderRadius: {
      type: String,
      default: "12px",
    },

    containerWidth: {
      type: String,
      default: "1280px",
    },
  },
  {
    _id: false,
  }
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

    flashDeals: {
      type: Boolean,
      default: true,
    },

    featuredProducts: {
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

    features: {
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
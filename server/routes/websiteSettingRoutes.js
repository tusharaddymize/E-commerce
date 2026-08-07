import express from "express";

import {
  getWebsiteSettings,
  updateLogo,
  updateHeroBanners,
  updateHomepageSettings,
  updateContactSettings,
  updateSocialSettings,
  updateAboutSettings,
  updatePolicySettings,
  updateSEOSettings,
  updateThemeSettings,
} from "../controllers/websiteSettingController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ======================================================
   Public Route
====================================================== */

router.get("/", getWebsiteSettings);

/* ======================================================
   Admin Routes
====================================================== */

// Logo & Favicon
router.put(
  "/logo",
  protect,
  admin,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
  ]),
  updateLogo
);

// Hero Banners
router.put(
  "/hero-banners",
  protect,
  admin,
  upload.array("images", 5),
  updateHeroBanners
);

// Homepage
router.put(
  "/homepage",
  protect,
  admin,
  updateHomepageSettings
);

// Contact
router.put(
  "/contact",
  protect,
  admin,
  updateContactSettings
);

// Social
router.put(
  "/social",
  protect,
  admin,
  updateSocialSettings
);

// About
router.put(
  "/about",
  protect,
  admin,
  updateAboutSettings
);

// Policies
router.put(
  "/policies",
  protect,
  admin,
  updatePolicySettings
);

// SEO
router.put(
  "/seo",
  protect,
  admin,
  updateSEOSettings
);

// Theme
router.put(
  "/theme",
  protect,
  admin,
  updateThemeSettings
);

export default router;
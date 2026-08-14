import WebsiteSetting from "../models/WebsiteSetting.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* ============================================================
   GET / CREATE WEBSITE SETTINGS DOCUMENT
============================================================ */

const getSettingsDocument = async () => {
  let settings = await WebsiteSetting.findOne();

  if (!settings) {
    settings = await WebsiteSetting.create({});
  }

  return settings;
};

/* ============================================================
   CLOUDINARY UPLOAD HELPER
============================================================ */

const uploadToCloudinary = async (
  file,
  folder
) => {
  return new Promise((resolve, reject) => {
    if (!file?.buffer) {
      return reject(
        new Error("Invalid file buffer.")
      );
    }

    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(stream);
  });
};

/* ============================================================
   GET WEBSITE SETTINGS
   GET /api/website-settings
============================================================ */

export const getWebsiteSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    return res.status(200).json({
      success: true,
      message:
        "Website settings fetched successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Get Website Settings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch website settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   UPDATE LOGO + FAVICON
   PUT /api/website-settings/logo
============================================================ */

export const updateLogo = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    /* =========================
       LOGO
    ========================= */

    if (req.files?.logo?.[0]) {
      const result =
        await uploadToCloudinary(
          req.files.logo[0],
          "website/logo"
        );

      settings.logo =
        result.secure_url;
    }

    /* =========================
       FAVICON
    ========================= */

    if (req.files?.favicon?.[0]) {
      const result =
        await uploadToCloudinary(
          req.files.favicon[0],
          "website/favicon"
        );

      settings.favicon =
        result.secure_url;
    }

    await settings.save();

    return res.status(200).json({
      success: true,
      message:
        "Logo and favicon updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Update Logo Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update logo and favicon.",
      error: error.message,
    });
  }
};

/* ============================================================
   UPDATE HERO BANNERS
   PUT /api/website-settings/hero-banners

   IMPORTANT:

   Frontend sends:

   heroBanners = [
      {
        image: "existing cloudinary url"
      },
      {
        image: File
      },
      {
        image: "existing cloudinary url"
      }
   ]

   imageIndexes = [1]

   images[0] = banner index 1
============================================================ */

export const updateHeroBanners = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    /* ========================================================
       1. READ BANNER DATA
    ======================================================== */

    let heroBanners =
      req.body.heroBanners;

    if (
      typeof heroBanners === "string"
    ) {
      try {
        heroBanners =
          JSON.parse(heroBanners);
      } catch (parseError) {
        console.error(
          "Hero Banner JSON Parse Error:",
          parseError
        );

        return res.status(400).json({
          success: false,
          message:
            "Invalid heroBanners JSON.",
        });
      }
    }

    if (!Array.isArray(heroBanners)) {
      return res.status(400).json({
        success: false,
        message:
          "heroBanners must be an array.",
      });
    }

    /* ========================================================
       2. READ UPLOADED FILES
    ======================================================== */

    const uploadedFiles =
      Array.isArray(req.files)
        ? req.files
        : [];

    /* ========================================================
       3. READ IMAGE INDEXES
    ======================================================== */

    let imageIndexes =
      req.body.imageIndexes;

    if (
      typeof imageIndexes === "string"
    ) {
      try {
        imageIndexes =
          JSON.parse(imageIndexes);
      } catch (error) {
        imageIndexes = [];
      }
    }

    if (!Array.isArray(imageIndexes)) {
      imageIndexes = [];
    }

    /*
      Convert indexes to numbers.

      Example:
      ["1", "3"]

      becomes:

      [1, 3]
    */

    imageIndexes =
      imageIndexes
        .map((index) => Number(index))
        .filter(
          (index) =>
            Number.isInteger(index) &&
            index >= 0
        );

    console.log(
      "========================================"
    );

    console.log(
      "HERO BANNER UPDATE"
    );

    console.log(
      "Total Banners:",
      heroBanners.length
    );

    console.log(
      "Uploaded Files:",
      uploadedFiles.length
    );

    console.log(
      "Image Indexes:",
      imageIndexes
    );

    console.log(
      "========================================"
    );

    /* ========================================================
       4. CREATE FINAL BANNER ARRAY
    ======================================================== */

    const formattedBanners = [];

    for (
      let index = 0;
      index < heroBanners.length;
      index++
    ) {
      const banner =
        heroBanners[index] || {};

      /* ======================================================
         EXISTING IMAGE
      ====================================================== */

      let imageUrl =
        typeof banner.image === "string"
          ? banner.image
          : "";

      /* ======================================================
         FIND FILE FOR CURRENT BANNER
      ====================================================== */

      const filePosition =
        imageIndexes.indexOf(index);

      /* ======================================================
         NEW / REPLACEMENT IMAGE
      ====================================================== */

      if (
        filePosition !== -1 &&
        uploadedFiles[filePosition]
      ) {
        const file =
          uploadedFiles[filePosition];

        console.log(
          `Uploading image for banner ${index + 1}`
        );

        const uploadResult =
          await uploadToCloudinary(
            file,
            "website/hero-banners"
          );

        imageUrl =
          uploadResult.secure_url;

        console.log(
          `Image uploaded for banner ${index + 1}:`,
          imageUrl
        );
      }

      /* ======================================================
         PRESERVE MONGODB _id
      ====================================================== */

      const existingBanner =
        settings.heroBanners?.[index];

      /* ======================================================
         FINAL BANNER
      ====================================================== */

      const finalBanner = {
        title:
          banner.title || "",

        subtitle:
          banner.subtitle || "",

        description:
          banner.description || "",

        image:
          imageUrl,

        buttonText:
          banner.buttonText ||
          "Shop Now",

        buttonLink:
          banner.buttonLink ||
          "/products",

        active:
          banner.active === undefined
            ? true
            : Boolean(banner.active),

        order: index,
      };

      /*
        Preserve existing MongoDB ID
        when banner already exists.
      */

      if (existingBanner?._id) {
        finalBanner._id =
          existingBanner._id;
      }

      formattedBanners.push(
        finalBanner
      );
    }

    /* ========================================================
       5. REMOVE EMPTY BANNERS
       
       IMPORTANT:
       Agar admin ne Add Banner kiya hai
       but image select nahi ki,
       us blank banner ko database me
       permanently save nahi karenge.
    ======================================================== */

    const validBanners =
      formattedBanners.filter(
        (banner) =>
          banner.image &&
          banner.image.trim() !== ""
      );

    /* ========================================================
       6. RESET ORDER
    ======================================================== */

    validBanners.forEach(
      (banner, index) => {
        banner.order = index;
      }
    );

    /* ========================================================
       7. SAVE
    ======================================================== */

    settings.heroBanners =
      validBanners;

    await settings.save();

    /* ========================================================
       8. RESPONSE
    ======================================================== */

    console.log(
      "Final Hero Banners:",
      settings.heroBanners
    );

    return res.status(200).json({
      success: true,

      message:
        "Hero banners updated successfully.",

      data:
        settings.heroBanners,
    });
  } catch (error) {
    console.error(
      "Update Hero Banner Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to update hero banners.",

      error: error.message,
    });
  }
};

/* ============================================================
   UPDATE HOMEPAGE SETTINGS
   PUT /api/website-settings/homepage
============================================================ */

export const updateHomepageSettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const {
        homepageBanners,
        homepageSections,
      } = req.body;

      /* =========================
         Homepage Banners
      ========================= */

      if (
        homepageBanners !== undefined
      ) {
        if (
          !Array.isArray(
            homepageBanners
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "homepageBanners must be an array.",
          });
        }

        settings.homepageBanners =
          homepageBanners.map(
            (banner, index) => ({
              title:
                banner?.title || "",

              image:
                banner?.image || "",

              link:
                banner?.link || "",

              active:
                banner?.active ===
                undefined
                  ? true
                  : banner.active,

              order:
                banner?.order ===
                undefined
                  ? index
                  : banner.order,
            })
          );
      }

      /* =========================
         Homepage Sections
      ========================= */

      if (homepageSections) {
        const current =
          settings.homepageSections ||
          {};

        settings.homepageSections = {
          hero:
            homepageSections.hero ??
            current.hero ??
            true,

          categories:
            homepageSections.categories ??
            current.categories ??
            true,

          flashDeals:
            homepageSections.flashDeals ??
            current.flashDeals ??
            true,

          featuredProducts:
            homepageSections.featuredProducts ??
            current.featuredProducts ??
            true,

          bestSelling:
            homepageSections.bestSelling ??
            current.bestSelling ??
            true,

          newArrivals:
            homepageSections.newArrivals ??
            current.newArrivals ??
            true,

          features:
            homepageSections.features ??
            current.features ??
            true,

          testimonials:
            homepageSections.testimonials ??
            current.testimonials ??
            true,

          newsletter:
            homepageSections.newsletter ??
            current.newsletter ??
            true,
        };
      }

      await settings.save();

      return res.status(200).json({
        success: true,

        message:
          "Homepage settings updated successfully.",

        data: {
          homepageBanners:
            settings.homepageBanners,

          homepageSections:
            settings.homepageSections,
        },
      });
    } catch (error) {
      console.error(
        "Homepage Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update homepage settings.",
        error: error.message,
      });
    }
  };

/* ============================================================
   UPDATE CONTACT SETTINGS
   PUT /api/website-settings/contact
============================================================ */

export const updateContactSettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const current =
        settings.contact || {};

      settings.contact = {
        companyName:
          req.body.companyName ??
          current.companyName ??
          "",

        email:
          req.body.email ??
          current.email ??
          "",

        phone:
          req.body.phone ??
          current.phone ??
          "",

        whatsapp:
          req.body.whatsapp ??
          current.whatsapp ??
          "",

        address:
          req.body.address ??
          current.address ??
          "",

        googleMap:
          req.body.googleMap ??
          current.googleMap ??
          "",

        businessHours:
          req.body.businessHours ??
          current.businessHours ??
          "",

        supportHours:
          req.body.supportHours ??
          current.supportHours ??
          "",

        heading:
          req.body.heading ??
          current.heading ??
          "",

        description:
          req.body.description ??
          current.description ??
          "",
      };

      await settings.save();

      return res.status(200).json({
        success: true,
        message:
          "Contact settings updated successfully.",
        data: settings.contact,
      });
    } catch (error) {
      console.error(
        "Contact Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update contact settings.",
        error: error.message,
      });
    }
  };

/* ============================================================
   UPDATE SOCIAL SETTINGS
   PUT /api/website-settings/social
============================================================ */

export const updateSocialSettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const current =
        settings.social || {};

      settings.social = {
        facebook:
          req.body.facebook ??
          current.facebook ??
          "",

        instagram:
          req.body.instagram ??
          current.instagram ??
          "",

        twitter:
          req.body.twitter ??
          current.twitter ??
          "",

        linkedin:
          req.body.linkedin ??
          current.linkedin ??
          "",

        youtube:
          req.body.youtube ??
          current.youtube ??
          "",

        whatsapp:
          req.body.whatsapp ??
          current.whatsapp ??
          "",

        telegram:
          req.body.telegram ??
          current.telegram ??
          "",

        github:
          req.body.github ??
          current.github ??
          "",
      };

      await settings.save();

      return res.status(200).json({
        success: true,
        message:
          "Social settings updated successfully.",
        data: settings.social,
      });
    } catch (error) {
      console.error(
        "Update Social Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update social settings.",
        error: error.message,
      });
    }
  };

/* ============================================================
   UPDATE ABOUT SETTINGS
   PUT /api/website-settings/about
============================================================ */

export const updateAboutSettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const current =
        settings.about || {};

      settings.about = {
        title:
          req.body.title ??
          current.title ??
          "",

        subtitle:
          req.body.subtitle ??
          current.subtitle ??
          "",

        description:
          req.body.description ??
          current.description ??
          "",

        mission:
          req.body.mission ??
          current.mission ??
          "",

        vision:
          req.body.vision ??
          current.vision ??
          "",

        experience:
          req.body.experience !==
            undefined &&
          req.body.experience !== ""
            ? Number(
                req.body.experience
              )
            : current.experience ?? 0,

        customers:
          req.body.customers !==
            undefined &&
          req.body.customers !== ""
            ? Number(
                req.body.customers
              )
            : current.customers ?? 0,

        projects:
          req.body.projects !==
            undefined &&
          req.body.projects !== ""
            ? Number(
                req.body.projects
              )
            : current.projects ?? 0,
      };

      await settings.save();

      return res.status(200).json({
        success: true,
        message:
          "About settings updated successfully.",
        data: settings.about,
      });
    } catch (error) {
      console.error(
        "Update About Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update About settings.",
        error: error.message,
      });
    }
  };

/* ============================================================
   UPDATE POLICY SETTINGS
   PUT /api/website-settings/policies
============================================================ */

export const updatePolicySettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const current =
        settings.policies || {};

      settings.policies = {
        privacyPolicy:
          req.body.privacyPolicy ??
          current.privacyPolicy ??
          "",

        termsConditions:
          req.body.termsConditions ??
          current.termsConditions ??
          "",

        refundPolicy:
          req.body.refundPolicy ??
          current.refundPolicy ??
          "",

        shippingPolicy:
          req.body.shippingPolicy ??
          current.shippingPolicy ??
          "",

        cancellationPolicy:
          req.body.cancellationPolicy ??
          current.cancellationPolicy ??
          "",
      };

      await settings.save();

      return res.status(200).json({
        success: true,
        message:
          "Policy settings updated successfully.",
        data: settings.policies,
      });
    } catch (error) {
      console.error(
        "Update Policy Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update policy settings.",
        error: error.message,
      });
    }
  };

/* ============================================================
   UPDATE SEO SETTINGS
   PUT /api/website-settings/seo
============================================================ */

export const updateSEOSettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const current =
        settings.seo || {};

      settings.seo = {
        title:
          req.body.title ??
          current.title ??
          "",

        description:
          req.body.description ??
          current.description ??
          "",

        keywords:
          req.body.keywords ??
          current.keywords ??
          "",

        ogImage:
          req.body.ogImage ??
          current.ogImage ??
          "",
      };

      await settings.save();

      return res.status(200).json({
        success: true,
        message:
          "SEO settings updated successfully.",
        data: settings.seo,
      });
    } catch (error) {
      console.error(
        "Update SEO Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update SEO settings.",
        error: error.message,
      });
    }
  };

/* ============================================================
   UPDATE THEME SETTINGS
   PUT /api/website-settings/theme
============================================================ */

export const updateThemeSettings =
  async (req, res) => {
    try {
      const settings =
        await getSettingsDocument();

      const current =
        settings.theme || {};

      settings.theme = {
        primaryColor:
          req.body.primaryColor ??
          current.primaryColor ??
          "#355E3B",

        secondaryColor:
          req.body.secondaryColor ??
          current.secondaryColor ??
          "#1E3422",

        accentColor:
          req.body.accentColor ??
          current.accentColor ??
          "#f59e0b",

        buttonColor:
          req.body.buttonColor ??
          current.buttonColor ??
          "#355E3B",

        darkMode:
          req.body.darkMode ??
          current.darkMode ??
          false,

        fontFamily:
          req.body.fontFamily ??
          current.fontFamily ??
          "Inter",

        borderRadius:
          req.body.borderRadius ??
          current.borderRadius ??
          "12px",

        containerWidth:
          req.body.containerWidth ??
          current.containerWidth ??
          "1280px",
      };

      await settings.save();

      return res.status(200).json({
        success: true,
        message:
          "Theme settings updated successfully.",
        data: settings.theme,
      });
    } catch (error) {
      console.error(
        "Update Theme Settings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update theme settings.",
        error: error.message,
      });
    }
  };
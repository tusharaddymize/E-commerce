import WebsiteSetting from "../models/WebsiteSetting.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
/* ============================================================
   Helper Function
============================================================ */

const getSettingsDocument = async () => {
  let settings = await WebsiteSetting.findOne();

  if (!settings) {
    settings = await WebsiteSetting.create({});
  }

  return settings;
};

/* ============================================================
   Get Website Settings
   GET /api/website-settings
============================================================ */

export const getWebsiteSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    res.status(200).json({
      success: true,
      message: "Website settings fetched successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("Get Website Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch website settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Website Logo
   PUT /api/website-settings/logo
============================================================ */

export const updateLogo = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

if (req.files?.logo?.[0]) {
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "website/logo",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier
      .createReadStream(req.files.logo[0].buffer)
      .pipe(stream);
  });

  settings.logo = uploadResult.secure_url;
}

if (req.files?.favicon?.[0]) {
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "website/favicon",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier
      .createReadStream(req.files.favicon[0].buffer)
      .pipe(stream);
  });

  settings.favicon = uploadResult.secure_url;
}

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Logo updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("Update Logo Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update logo.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Hero Banners
   PUT /api/website-settings/hero-banners
============================================================ */

export const updateHeroBanners = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    let heroBanners = req.body.heroBanners;

    // FormData se string aayegi
    if (typeof heroBanners === "string") {
      heroBanners = JSON.parse(heroBanners);
    }

    if (!Array.isArray(heroBanners)) {
      return res.status(400).json({
        success: false,
        message: "heroBanners must be an array.",
      });
    }

    const uploadedFiles = req.files || [];

    let uploadIndex = 0;

    const formattedBanners = [];

    for (let i = 0; i < heroBanners.length; i++) {
      const banner = heroBanners[i];

      let imageUrl = banner.image || "";

      // Agar nayi image upload hui hai
      if (uploadedFiles[uploadIndex]) {
        const uploadResult = await new Promise(
          (resolve, reject) => {
            const stream =
              cloudinary.uploader.upload_stream(
                {
                  folder: "website/hero-banners",
                },
                (error, result) => {
                  if (error) return reject(error);

                  resolve(result);
                }
              );

            streamifier
              .createReadStream(
                uploadedFiles[uploadIndex].buffer
              )
              .pipe(stream);
          }
        );

        imageUrl = uploadResult.secure_url;

        uploadIndex++;
      }

      formattedBanners.push({
        title: banner.title || "",
        subtitle: banner.subtitle || "",
        description: banner.description || "",
        image: imageUrl,
        buttonText: banner.buttonText || "Shop Now",
        buttonLink: banner.buttonLink || "/products",
        active:
          banner.active === undefined
            ? true
            : banner.active,
        order:
          banner.order === undefined
            ? i
            : banner.order,
      });
    }

    settings.heroBanners = formattedBanners;

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Hero banners updated successfully.",
      data: settings.heroBanners,
    });
  } catch (error) {
    console.error("Update Hero Banner Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update hero banners.",
      error: error.message,
    });
  }
};
/* ============================================================
   Update Homepage Settings
   PUT /api/website-settings/homepage
============================================================ */

export const updateHomepageSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      homepageBanners,
      homepageSections,
    } = req.body;

    /* ---------------- Homepage Banners ---------------- */

    if (homepageBanners !== undefined) {
      if (!Array.isArray(homepageBanners)) {
        return res.status(400).json({
          success: false,
          message: "homepageBanners must be an array.",
        });
      }

      settings.homepageBanners = homepageBanners.map(
        (banner, index) => ({
          title: banner.title || "",
          image: banner.image || "",
          link: banner.link || "",
          active:
            banner.active === undefined
              ? true
              : banner.active,
          order:
            banner.order === undefined
              ? index
              : banner.order,
        })
      );
    }

    /* ---------------- Homepage Sections ---------------- */

    if (homepageSections) {
      settings.homepageSections = {
        hero:
          homepageSections.hero ??
          settings.homepageSections.hero,

        categories:
          homepageSections.categories ??
          settings.homepageSections.categories,

        bestSelling:
          homepageSections.bestSelling ??
          settings.homepageSections.bestSelling,

        newArrivals:
          homepageSections.newArrivals ??
          settings.homepageSections.newArrivals,

        testimonials:
          homepageSections.testimonials ??
          settings.homepageSections.testimonials,

        newsletter:
          homepageSections.newsletter ??
          settings.homepageSections.newsletter,
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Homepage settings updated successfully.",
      data: {
        homepageBanners: settings.homepageBanners,
        homepageSections: settings.homepageSections,
      },
    });
  } catch (error) {
    console.error("Homepage Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update homepage settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Contact Settings
   PUT /api/website-settings/contact
============================================================ */

export const updateContactSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      phone,
      email,
      address,
      workingHours,
      googleMap,
    } = req.body;

    settings.contact = {
      phone:
        phone ??
        settings.contact.phone,

      email:
        email ??
        settings.contact.email,

      address:
        address ??
        settings.contact.address,

      workingHours:
        workingHours ??
        settings.contact.workingHours,

      googleMap:
        googleMap ??
        settings.contact.googleMap,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Contact settings updated successfully.",
      data: settings.contact,
    });
  } catch (error) {
    console.error("Contact Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update contact settings.",
      error: error.message,
    });
  }
};
/* ============================================================
   Update Social Settings
   PUT /api/website-settings/social
============================================================ */

export const updateSocialSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
    } = req.body;

    settings.social = {
      facebook:
        facebook ??
        settings.social.facebook,

      instagram:
        instagram ??
        settings.social.instagram,

      twitter:
        twitter ??
        settings.social.twitter,

      linkedin:
        linkedin ??
        settings.social.linkedin,

      youtube:
        youtube ??
        settings.social.youtube,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Social settings updated successfully.",
      data: settings.social,
    });
  } catch (error) {
    console.error("Update Social Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update social settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update About Settings
   PUT /api/website-settings/about
============================================================ */

export const updateAboutSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      heading,
      description,
      image,
    } = req.body;

    settings.about = {
      heading:
        heading ??
        settings.about.heading,

      description:
        description ??
        settings.about.description,

      image:
        image ??
        settings.about.image,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: "About section updated successfully.",
      data: settings.about,
    });
  } catch (error) {
    console.error("Update About Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update About section.",
      error: error.message,
    });
  }
};
/* ============================================================
   Update Policy Settings
   PUT /api/website-settings/policies
============================================================ */

export const updatePolicySettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      privacy,
      terms,
      shipping,
      refund,
    } = req.body;

    settings.policies = {
      privacy:
        privacy ??
        settings.policies.privacy,

      terms:
        terms ??
        settings.policies.terms,

      shipping:
        shipping ??
        settings.policies.shipping,

      refund:
        refund ??
        settings.policies.refund,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Policies updated successfully.",
      data: settings.policies,
    });
  } catch (error) {
    console.error("Update Policy Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update policies.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update SEO Settings
   PUT /api/website-settings/seo
============================================================ */

export const updateSEOSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      title,
      description,
      keywords,
      ogImage,
    } = req.body;

    settings.seo = {
      title:
        title ??
        settings.seo.title,

      description:
        description ??
        settings.seo.description,

      keywords:
        keywords ??
        settings.seo.keywords,

      ogImage:
        ogImage ??
        settings.seo.ogImage,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: "SEO settings updated successfully.",
      data: settings.seo,
    });
  } catch (error) {
    console.error("Update SEO Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update SEO settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Theme Settings
   PUT /api/website-settings/theme
============================================================ */

export const updateThemeSettings = async (req, res) => {
  try {
    const settings = await getSettingsDocument();

    const {
      primaryColor,
      secondaryColor,
      buttonColor,
      darkMode,
    } = req.body;

    settings.theme = {
      primaryColor:
        primaryColor ??
        settings.theme.primaryColor,

      secondaryColor:
        secondaryColor ??
        settings.theme.secondaryColor,

      buttonColor:
        buttonColor ??
        settings.theme.buttonColor,

      darkMode:
        darkMode ??
        settings.theme.darkMode,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Theme settings updated successfully.",
      data: settings.theme,
    });
  } catch (error) {
    console.error("Update Theme Settings Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update theme settings.",
      error: error.message,
    });
  }
};
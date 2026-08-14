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

    // =========================
    // Upload Logo
    // =========================

    if (req.files?.logo?.[0]) {
      const uploadResult = await new Promise(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "website/logo",
              },
              (error, result) => {
                if (error) {
                  return reject(error);
                }

                resolve(result);
              }
            );

          streamifier
            .createReadStream(
              req.files.logo[0].buffer
            )
            .pipe(stream);
        }
      );

      settings.logo = uploadResult.secure_url;
    }

    // =========================
    // Upload Favicon
    // =========================

    if (req.files?.favicon?.[0]) {
      const uploadResult = await new Promise(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "website/favicon",
              },
              (error, result) => {
                if (error) {
                  return reject(error);
                }

                resolve(result);
              }
            );

          streamifier
            .createReadStream(
              req.files.favicon[0].buffer
            )
            .pipe(stream);
        }
      );

      settings.favicon =
        uploadResult.secure_url;
    }

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update logo and favicon.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Hero Banners
   PUT /api/website-settings/hero-banners
============================================================ */

export const updateHeroBanners = async (
  req,
  res
) => {
  try {
    // ==========================================
    // Get Website Settings
    // ==========================================

    const settings =
      await getSettingsDocument();

    // ==========================================
    // Get Hero Banners
    // ==========================================

    let heroBanners =
      req.body.heroBanners;

    if (
      typeof heroBanners === "string"
    ) {
      heroBanners =
        JSON.parse(heroBanners);
    }

    // ==========================================
    // Validate Hero Banners
    // ==========================================

    if (!Array.isArray(heroBanners)) {
      return res.status(400).json({
        success: false,
        message:
          "heroBanners must be an array.",
      });
    }

    // ==========================================
    // Uploaded Files
    // ==========================================

    const uploadedFiles =
      req.files || [];

    // ==========================================
    // Image Index Mapping
    // ==========================================
    //
    // Example:
    //
    // Banner 1 → existing
    // Banner 2 → existing
    // Banner 3 → NEW IMAGE
    // Banner 4 → existing
    //
    // imageIndexes = [2]
    //
    // This tells backend that uploadedFiles[0]
    // belongs to banner index 2.
    // ==========================================

    let imageIndexes =
      req.body.imageIndexes || "[]";

    if (
      typeof imageIndexes === "string"
    ) {
      imageIndexes =
        JSON.parse(imageIndexes);
    }

    if (!Array.isArray(imageIndexes)) {
      imageIndexes = [];
    }

    // ==========================================
    // Final Banner Array
    // ==========================================

    const formattedBanners = [];

    // ==========================================
    // Process Every Banner
    // ==========================================

    for (
      let i = 0;
      i < heroBanners.length;
      i++
    ) {
      const banner =
        heroBanners[i];

      // ========================================
      // Keep Existing Image
      // ========================================

      let imageUrl =
        banner?.image || "";

      // ========================================
      // Find Uploaded File For This Banner
      // ========================================

      const uploadedFileIndex =
        imageIndexes.indexOf(i);

      // ========================================
      // New Image Exists
      // ========================================

      if (
        uploadedFileIndex !== -1 &&
        uploadedFiles[
          uploadedFileIndex
        ]
      ) {
        const file =
          uploadedFiles[
            uploadedFileIndex
          ];

        // ======================================
        // Upload To Cloudinary
        // ======================================

        const uploadResult =
          await new Promise(
            (resolve, reject) => {
              const stream =
                cloudinary.uploader.upload_stream(
                  {
                    folder:
                      "website/hero-banners",
                  },
                  (
                    error,
                    result
                  ) => {
                    if (error) {
                      return reject(
                        error
                      );
                    }

                    resolve(result);
                  }
                );

              streamifier
                .createReadStream(
                  file.buffer
                )
                .pipe(stream);
            }
          );

        // ======================================
        // Replace Existing Image
        // ======================================

        imageUrl =
          uploadResult.secure_url;
      }

      // ========================================
      // Save Banner
      // ========================================

      formattedBanners.push({
        title:
          banner?.title || "",

        subtitle:
          banner?.subtitle || "",

        description:
          banner?.description || "",

        image: imageUrl,

        buttonText:
          banner?.buttonText ||
          "Shop Now",

        buttonLink:
          banner?.buttonLink ||
          "/products",

        active:
          banner?.active === undefined
            ? true
            : banner.active,

        order:
          banner?.order === undefined
            ? i
            : banner.order,
      });
    }

    // ==========================================
    // Save All Hero Banners
    // ==========================================

    settings.heroBanners =
      formattedBanners;

    await settings.save();

    // ==========================================
    // Success Response
    // ==========================================

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

      error:
        error.message,
    });
  }
};

/* ============================================================
   Update Homepage Settings
   PUT /api/website-settings/homepage
============================================================ */

export const updateHomepageSettings = async (
  req,
  res
) => {
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

    if (homepageBanners !== undefined) {
      if (
        !Array.isArray(homepageBanners)
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
              banner.title || "",

            image:
              banner.image || "",

            link:
              banner.link || "",

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

    /* =========================
       Homepage Sections
    ========================= */

    if (homepageSections) {
      settings.homepageSections = {
        hero:
          homepageSections.hero ??
          settings.homepageSections
            ?.hero ??
          true,

        categories:
          homepageSections.categories ??
          settings.homepageSections
            ?.categories ??
          true,

        flashDeals:
          homepageSections.flashDeals ??
          settings.homepageSections
            ?.flashDeals ??
          true,

        featuredProducts:
          homepageSections.featuredProducts ??
          settings.homepageSections
            ?.featuredProducts ??
          true,

        bestSelling:
          homepageSections.bestSelling ??
          settings.homepageSections
            ?.bestSelling ??
          true,

        newArrivals:
          homepageSections.newArrivals ??
          settings.homepageSections
            ?.newArrivals ??
          true,

        features:
          homepageSections.features ??
          settings.homepageSections
            ?.features ??
          true,

        testimonials:
          homepageSections.testimonials ??
          settings.homepageSections
            ?.testimonials ??
          true,

        newsletter:
          homepageSections.newsletter ??
          settings.homepageSections
            ?.newsletter ??
          true,
      };
    }

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update homepage settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Contact Settings
   PUT /api/website-settings/contact
============================================================ */

export const updateContactSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    const {
      companyName,
      email,
      phone,
      whatsapp,
      address,
      googleMap,
      businessHours,
      supportHours,
      heading,
      description,
    } = req.body;

    settings.contact = {
      companyName:
        companyName ??
        settings.contact?.companyName ??
        "",

      email:
        email ??
        settings.contact?.email ??
        "",

      phone:
        phone ??
        settings.contact?.phone ??
        "",

      whatsapp:
        whatsapp ??
        settings.contact?.whatsapp ??
        "",

      address:
        address ??
        settings.contact?.address ??
        "",

      googleMap:
        googleMap ??
        settings.contact?.googleMap ??
        "",

      businessHours:
        businessHours ??
        settings.contact
          ?.businessHours ??
        "",

      supportHours:
        supportHours ??
        settings.contact
          ?.supportHours ??
        "",

      heading:
        heading ??
        settings.contact?.heading ??
        "",

      description:
        description ??
        settings.contact
          ?.description ??
        "",
    };

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update contact settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Social Settings
   PUT /api/website-settings/social
============================================================ */

export const updateSocialSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    const {
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      whatsapp,
      telegram,
      github,
    } = req.body;

    settings.social = {
      facebook:
        facebook ??
        settings.social?.facebook ??
        "",

      instagram:
        instagram ??
        settings.social?.instagram ??
        "",

      twitter:
        twitter ??
        settings.social?.twitter ??
        "",

      linkedin:
        linkedin ??
        settings.social?.linkedin ??
        "",

      youtube:
        youtube ??
        settings.social?.youtube ??
        "",

      whatsapp:
        whatsapp ??
        settings.social?.whatsapp ??
        "",

      telegram:
        telegram ??
        settings.social?.telegram ??
        "",

      github:
        github ??
        settings.social?.github ??
        "",
    };

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update social settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update About Settings
   PUT /api/website-settings/about
============================================================ */

export const updateAboutSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    const {
      title,
      subtitle,
      description,
      mission,
      vision,
      experience,
      customers,
      projects,
    } = req.body;

    settings.about = {
      title:
        title ??
        settings.about?.title ??
        "",

      subtitle:
        subtitle ??
        settings.about?.subtitle ??
        "",

      description:
        description ??
        settings.about
          ?.description ??
        "",

      mission:
        mission ??
        settings.about?.mission ??
        "",

      vision:
        vision ??
        settings.about?.vision ??
        "",

      experience:
        experience !== undefined &&
        experience !== ""
          ? Number(experience)
          : settings.about
              ?.experience ?? 0,

      customers:
        customers !== undefined &&
        customers !== ""
          ? Number(customers)
          : settings.about
              ?.customers ?? 0,

      projects:
        projects !== undefined &&
        projects !== ""
          ? Number(projects)
          : settings.about
              ?.projects ?? 0,
    };

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update About settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Policy Settings
   PUT /api/website-settings/policies
============================================================ */

export const updatePolicySettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    const {
      privacyPolicy,
      termsConditions,
      refundPolicy,
      shippingPolicy,
      cancellationPolicy,
    } = req.body;

    settings.policies = {
      privacyPolicy:
        privacyPolicy ??
        settings.policies
          ?.privacyPolicy ??
        "",

      termsConditions:
        termsConditions ??
        settings.policies
          ?.termsConditions ??
        "",

      refundPolicy:
        refundPolicy ??
        settings.policies
          ?.refundPolicy ??
        "",

      shippingPolicy:
        shippingPolicy ??
        settings.policies
          ?.shippingPolicy ??
        "",

      cancellationPolicy:
        cancellationPolicy ??
        settings.policies
          ?.cancellationPolicy ??
        "",
    };

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update policy settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update SEO Settings
   PUT /api/website-settings/seo
============================================================ */

export const updateSEOSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    const {
      title,
      description,
      keywords,
      ogImage,
    } = req.body;

    settings.seo = {
      title:
        title ??
        settings.seo?.title ??
        "",

      description:
        description ??
        settings.seo
          ?.description ??
        "",

      keywords:
        keywords ??
        settings.seo?.keywords ??
        "",

      ogImage:
        ogImage ??
        settings.seo?.ogImage ??
        "",
    };

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update SEO settings.",
      error: error.message,
    });
  }
};

/* ============================================================
   Update Theme Settings
   PUT /api/website-settings/theme
============================================================ */

export const updateThemeSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await getSettingsDocument();

    const {
      primaryColor,
      secondaryColor,
      accentColor,
      buttonColor,
      darkMode,
      fontFamily,
      borderRadius,
      containerWidth,
    } = req.body;

    settings.theme = {
      primaryColor:
        primaryColor ??
        settings.theme
          ?.primaryColor ??
        "#355E3B",

      secondaryColor:
        secondaryColor ??
        settings.theme
          ?.secondaryColor ??
        "#1E3422",

      accentColor:
        accentColor ??
        settings.theme
          ?.accentColor ??
        "#f59e0b",

      buttonColor:
        buttonColor ??
        settings.theme
          ?.buttonColor ??
        "#355E3B",

      darkMode:
        darkMode ??
        settings.theme
          ?.darkMode ??
        false,

      fontFamily:
        fontFamily ??
        settings.theme
          ?.fontFamily ??
        "Inter",

      borderRadius:
        borderRadius ??
        settings.theme
          ?.borderRadius ??
        "12px",

      containerWidth:
        containerWidth ??
        settings.theme
          ?.containerWidth ??
        "1280px",
    };

    await settings.save();

    res.status(200).json({
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

    res.status(500).json({
      success: false,
      message:
        "Failed to update theme settings.",
      error: error.message,
    });
  }
};
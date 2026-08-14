import API from "./api";

// ======================================================
// Get Website Settings
// Public
// ======================================================

export const getWebsiteSettings = async () => {
  const { data } = await API.get(
    "/website-settings"
  );

  return data;
};

// ======================================================
// Update Logo + Favicon
// Admin
// ======================================================

export const updateLogo = async ({
  logo,
  favicon,
}) => {
  const formData = new FormData();

  // ------------------------------------------
  // Logo
  // ------------------------------------------

  if (logo instanceof File) {
    formData.append("logo", logo);
  }

  // ------------------------------------------
  // Favicon
  // ------------------------------------------

  if (favicon instanceof File) {
    formData.append("favicon", favicon);
  }

  const { data } = await API.put(
    "/website-settings/logo",
    formData
  );

  return data;
};

// ======================================================
// Update Hero Banners
// Admin
//
// Important:
// We send:
// 1. heroBanners = banner information
// 2. images = only newly selected images
// 3. imageIndexes = which banner each image belongs to
//
// Example:
//
// Banner 0 -> old image
// Banner 1 -> NEW image
// Banner 2 -> old image
// Banner 3 -> NEW image
//
// imageIndexes = [1, 3]
//
// images[0] -> Banner 1
// images[1] -> Banner 3
// ======================================================

export const updateHeroBanners = async (
  heroBanners = []
) => {
  const formData = new FormData();

  // ==================================================
  // Safety
  // ==================================================

  if (!Array.isArray(heroBanners)) {
    throw new Error(
      "Hero banners must be an array."
    );
  }

  // ==================================================
  // Prepare Banner Data
  // ==================================================

  const bannerData = heroBanners.map(
    (banner, index) => ({
      // ----------------------------------------------
      // Preserve MongoDB ID
      // ----------------------------------------------

      _id: banner?._id || undefined,

      // ----------------------------------------------
      // Text
      // ----------------------------------------------

      title:
        banner?.title || "",

      subtitle:
        banner?.subtitle || "",

      description:
        banner?.description || "",

      // ----------------------------------------------
      // Button
      // ----------------------------------------------

      buttonText:
        banner?.buttonText ||
        "Shop Now",

      buttonLink:
        banner?.buttonLink ||
        "/products",

      // ----------------------------------------------
      // Status
      // ----------------------------------------------

      active:
        banner?.active === undefined
          ? true
          : Boolean(banner.active),

      // ----------------------------------------------
      // Order
      // ----------------------------------------------

      order:
        banner?.order !== undefined
          ? Number(banner.order)
          : index,

      // ----------------------------------------------
      // Existing Image
      //
      // If image is a Cloudinary URL,
      // send it to backend.
      //
      // If image is a File,
      // send empty string because actual
      // file will be sent separately.
      // ----------------------------------------------

      image:
        typeof banner?.image === "string"
          ? banner.image
          : "",
    })
  );

  // ==================================================
  // Send Banner Data
  // ==================================================

  formData.append(
    "heroBanners",
    JSON.stringify(bannerData)
  );

  // ==================================================
  // Image Index Mapping
  // ==================================================

  const imageIndexes = [];

  heroBanners.forEach(
    (banner, index) => {
      // ----------------------------------------------
      // Only newly selected files
      // ----------------------------------------------

      if (
        banner?.image instanceof File
      ) {
        // Tell backend:
        // this uploaded image belongs to
        // this banner index
        imageIndexes.push(index);

        // Upload actual image
        formData.append(
          "images",
          banner.image
        );
      }
    }
  );

  // ==================================================
  // Send Image Index Mapping
  // ==================================================

  formData.append(
    "imageIndexes",
    JSON.stringify(imageIndexes)
  );

  // ==================================================
  // Debug
  // ==================================================

  console.log(
    "=========================================="
  );

  console.log(
    "Updating Hero Banners"
  );

  console.log(
    "Total Banners:",
    heroBanners.length
  );

  console.log(
    "Image Indexes:",
    imageIndexes
  );

  console.log(
    "New Images:",
    heroBanners.filter(
      (banner) =>
        banner?.image instanceof File
    ).length
  );

  console.log(
    "=========================================="
  );

  // ==================================================
  // API Request
  //
  // IMPORTANT:
  // Do NOT manually set Content-Type.
  // Axios/browser will automatically create:
  //
  // multipart/form-data; boundary=...
  // ==================================================

  const { data } = await API.put(
    "/website-settings/hero-banners",
    formData
  );

  return data;
};

// ======================================================
// Update Homepage Settings
// Admin
// ======================================================

export const updateHomepageSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/homepage",
      payload
    );

    return data;
  };

// ======================================================
// Update Contact Settings
// Admin
// ======================================================

export const updateContactSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/contact",
      payload
    );

    return data;
  };

// ======================================================
// Update Social Settings
// Admin
// ======================================================

export const updateSocialSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/social",
      payload
    );

    return data;
  };

// ======================================================
// Update About Settings
// Admin
// ======================================================

export const updateAboutSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/about",
      payload
    );

    return data;
  };

// ======================================================
// Update Policy Settings
// Admin
// ======================================================

export const updatePolicySettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/policies",
      payload
    );

    return data;
  };

// ======================================================
// Update SEO Settings
// Admin
// ======================================================

export const updateSEOSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/seo",
      payload
    );

    return data;
  };

// ======================================================
// Update Theme Settings
// Admin
// ======================================================

export const updateThemeSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/theme",
      payload
    );

    return data;
  };

// ======================================================
// Default Export
// ======================================================

const websiteSettingService = {
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
};

export default websiteSettingService;
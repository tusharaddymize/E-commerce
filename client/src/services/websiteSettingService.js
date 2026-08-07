import API from "./api";

// ==========================================
// Get Website Settings
// Public
// ==========================================

export const getWebsiteSettings = async () => {
  const { data } = await API.get(
    "/website-settings"
  );

  return data;
};

// ==========================================
// Update Logo + Favicon
// Admin
// ==========================================

export const updateLogo = async ({
  logo,
  favicon,
}) => {
  const formData = new FormData();

  if (logo instanceof File) {
    formData.append("logo", logo);
  }

  if (favicon instanceof File) {
    formData.append(
      "favicon",
      favicon
    );
  }

  const { data } = await API.put(
    "/website-settings/logo",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

// ==========================================
// Update Hero Banners
// Admin
// ==========================================

export const updateHeroBanners = async (
  heroBanners = []
) => {
  const formData = new FormData();

  const bannerData = heroBanners.map(
    (banner) => ({
      title: banner?.title || "",

      subtitle:
        banner?.subtitle || "",

      description:
        banner?.description || "",

      buttonText:
        banner?.buttonText || "",

      buttonLink:
        banner?.buttonLink || "",

      active:
        banner?.active === undefined
          ? true
          : banner.active,

      order: banner?.order ?? 0,

      // Keep existing Cloudinary image URL
      image:
        typeof banner?.image ===
        "string"
          ? banner.image
          : "",
    })
  );

  formData.append(
    "heroBanners",
    JSON.stringify(bannerData)
  );

  heroBanners.forEach((banner) => {
    if (banner?.image instanceof File) {
      formData.append(
        "images",
        banner.image
      );
    }
  });

  const { data } = await API.put(
    "/website-settings/hero-banners",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

// ==========================================
// Update Homepage Settings
// Admin
// ==========================================

export const updateHomepageSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/homepage",
      payload
    );

    return data;
  };

// ==========================================
// Update Contact Settings
// Admin
// ==========================================

export const updateContactSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/contact",
      payload
    );

    return data;
  };

// ==========================================
// Update Social Settings
// Admin
// ==========================================

export const updateSocialSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/social",
      payload
    );

    return data;
  };

// ==========================================
// Update About Settings
// Admin
// ==========================================

export const updateAboutSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/about",
      payload
    );

    return data;
  };

// ==========================================
// Update Policy Settings
// Admin
// ==========================================

export const updatePolicySettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/policies",
      payload
    );

    return data;
  };

// ==========================================
// Update Theme Settings
// Admin
//
// PUT /api/website-settings/theme
// ==========================================

export const updateThemeSettings =
  async (payload) => {
    const { data } = await API.put(
      "/website-settings/theme",
      payload
    );

    return data;
  };

// ==========================================
// Default Export
// ==========================================

const websiteSettingService = {
  getWebsiteSettings,

  updateLogo,

  updateHeroBanners,

  updateHomepageSettings,

  updateContactSettings,

  updateSocialSettings,

  updateAboutSettings,

  updatePolicySettings,

  updateThemeSettings,
};

export default websiteSettingService;
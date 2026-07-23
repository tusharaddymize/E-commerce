import API from "./api";

/* ==========================================
   Get Website Settings
========================================== */

export const getWebsiteSettings = async () => {
  const { data } = await API.get("/website-settings");
  return data;
};

/* ==========================================
   Logo
========================================== */

export const updateLogo = async ({ logo, favicon }) => {
  const formData = new FormData();

  if (logo instanceof File) {
    formData.append("logo", logo);
  }

  if (favicon instanceof File) {
    formData.append("favicon", favicon);
  }

  const { data } = await API.put(
    "/website-settings/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

/* ==========================================
   Hero Banners
========================================== */

export const updateHeroBanners = async (heroBanners) => {
  const formData = new FormData();

  const bannerData = heroBanners.map((banner) => ({
    title: banner.title || "",
    subtitle: banner.subtitle || "",
    description: banner.description || "",
    buttonText: banner.buttonText || "",
    buttonLink: banner.buttonLink || "",
    active:
      banner.active === undefined
        ? true
        : banner.active,
    order: banner.order ?? 0,

    // Existing Cloudinary URL (if any)
    image:
      typeof banner.image === "string"
        ? banner.image
        : "",
  }));

  formData.append(
    "heroBanners",
    JSON.stringify(bannerData)
  );

  heroBanners.forEach((banner) => {
    if (banner.image instanceof File) {
      formData.append("images", banner.image);
    }
  });

  const { data } = await API.put(
    "/website-settings/hero-banners",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

/* ==========================================
   Homepage
========================================== */

export const updateHomepageSettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/homepage",
    payload
  );

  return data;
};

/* ==========================================
   Contact
========================================== */

export const updateContactSettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/contact",
    payload
  );

  return data;
};

/* ==========================================
   Social
========================================== */

export const updateSocialSettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/social",
    payload
  );

  return data;
};

/* ==========================================
   About
========================================== */

export const updateAboutSettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/about",
    payload
  );

  return data;
};

/* ==========================================
   Policies
========================================== */

export const updatePolicySettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/policies",
    payload
  );

  return data;
};

/* ==========================================
   SEO
========================================== */

export const updateSEOSettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/seo",
    payload
  );

  return data;
};

/* ==========================================
   Theme
========================================== */

export const updateThemeSettings = async (payload) => {
  const { data } = await API.put(
    "/website-settings/theme",
    payload
  );

  return data;
};

/* ==========================================
   Export Everything
========================================== */

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
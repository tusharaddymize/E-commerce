import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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
} from "../../services/websiteSettingService";

/* Components */

import LogoSettings from "../../components/admin/settings/LogoSettings";
import HeroBannerSettings from "../../components/admin/settings/HeroBannerSettings";
import HomepageSettings from "../../components/admin/settings/HomepageSettings";
import ContactSettings from "../../components/admin/settings/ContactSettings";
import SocialSettings from "../../components/admin/settings/SocialSettings";
import AboutSettings from "../../components/admin/settings/AboutSettings";
import PolicySettings from "../../components/admin/settings/PolicySettings";
import SEOSettings from "../../components/admin/settings/SEOSettings";
import ThemeSettings from "../../components/admin/settings/ThemeSettings";

const WebsiteSettings = () => {
  /* ===============================
      Loading
  =============================== */

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===============================
      Main Data
  =============================== */

  const [settings, setSettings] = useState(null);

  /* ===============================
      Individual States
  =============================== */

const [logo, setLogo] = useState(null);
const [favicon, setFavicon] = useState(null);

const [logoPreview, setLogoPreview] = useState("");
const [faviconPreview, setFaviconPreview] = useState("");

  const [heroBanners, setHeroBanners] = useState([]);

  const [homepage, setHomepage] = useState({
    homepageBanners: [],
    homepageSections: {},
  });

  const [contact, setContact] = useState({});

  const [social, setSocial] = useState({});

  const [about, setAbout] = useState({});

  const [policies, setPolicies] = useState({});

  const [seo, setSeo] = useState({});

  const [theme, setTheme] = useState({});

  /* ===============================
      Fetch Settings
  =============================== */

  const fetchWebsiteSettings = async () => {
    try {
      setLoading(true);

      const res = await getWebsiteSettings();

      const data = res.data;

      setSettings(data);

setLogo(null);
setFavicon(null);

setLogoPreview(data.logo || "");
setFaviconPreview(data.favicon || "");

setHeroBanners(
  (data.heroBanners || []).map((banner) => ({
    ...banner,
    preview: banner.image || "",
  }))
);

      setHomepage({
        homepageBanners:
          data.homepageBanners || [],
        homepageSections:
          data.homepageSections || {},
      });

      setContact(data.contact || {});

      setSocial(data.social || {});

      setAbout(data.about || {});

      setPolicies(data.policies || {});

      setSeo(data.seo || {});

      setTheme(data.theme || {});
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load website settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteSettings();
  }, []);

  /* ===============================
      Save Functions
      (Part 3.3)
  =============================== */
/* ===============================================
   Save Logo
=============================================== */

const handleSaveLogo = async () => {
  try {
    setSaving(true);

    await updateLogo({
      logo,
      favicon,
    });

await fetchWebsiteSettings();

toast.success("Logo updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update logo."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save Hero Banner
=============================================== */

const handleSaveHero = async () => {
  try {
    setSaving(true);

await updateHeroBanners(heroBanners);

await fetchWebsiteSettings();

toast.success("Hero banners updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update hero banners."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save Homepage
=============================================== */

const handleSaveHomepage = async () => {
  try {
    setSaving(true);

    await updateHomepageSettings(homepage);

    toast.success("Homepage updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update homepage."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save Contact
=============================================== */

const handleSaveContact = async () => {
  try {
    setSaving(true);

    await updateContactSettings(contact);

    toast.success("Contact settings updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update contact settings."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save Social
=============================================== */

const handleSaveSocial = async () => {
  try {
    setSaving(true);

    await updateSocialSettings(social);

    toast.success("Social links updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update social settings."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save About
=============================================== */

const handleSaveAbout = async () => {
  try {
    setSaving(true);

    await updateAboutSettings(about);

    toast.success("About section updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update About section."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save Policies
=============================================== */

const handleSavePolicies = async () => {
  try {
    setSaving(true);

    await updatePolicySettings(policies);

    toast.success("Policies updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update policies."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save SEO
=============================================== */

const handleSaveSEO = async () => {
  try {
    setSaving(true);

    await updateSEOSettings(seo);

    toast.success("SEO settings updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update SEO settings."
    );
  } finally {
    setSaving(false);
  }
};

/* ===============================================
   Save Theme
=============================================== */

const handleSaveTheme = async () => {
  try {
    setSaving(true);

    await updateThemeSettings(theme);

    toast.success("Theme updated successfully.");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update theme."
    );
  } finally {
    setSaving(false);
  }
};
    /* ===============================
      Loading UI
  =============================== */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading Website Settings...
          </p>
        </div>
      </div>
    );
  }

  /* ===============================
      UI
  =============================== */

  return (
    <div className="w-full p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Website Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your complete website from one place.
        </p>

      </div>

      {/* Settings */}

      <div className="grid grid-cols-1 gap-6">

        {/* Logo */}

 <LogoSettings
    logo={logo}
    favicon={favicon}
    logoPreview={logoPreview}
    faviconPreview={faviconPreview}
    setLogo={setLogo}
    setFavicon={setFavicon}
    setLogoPreview={setLogoPreview}
    setFaviconPreview={setFaviconPreview}
    onSave={handleSaveLogo}
    saving={saving}
/>

        {/* Hero */}

        <HeroBannerSettings
          heroBanners={heroBanners}
          setHeroBanners={setHeroBanners}
          onSave={handleSaveHero}
          saving={saving}
        />

        {/* Homepage */}

        <HomepageSettings
          homepage={homepage}
          setHomepage={setHomepage}
          onSave={handleSaveHomepage}
          saving={saving}
        />

        {/* Contact */}

        <ContactSettings
          contact={contact}
          setContact={setContact}
          onSave={handleSaveContact}
          saving={saving}
        />

        {/* Social */}

        <SocialSettings
          social={social}
          setSocial={setSocial}
          onSave={handleSaveSocial}
          saving={saving}
        />

        {/* About */}

        <AboutSettings
          about={about}
          setAbout={setAbout}
          onSave={handleSaveAbout}
          saving={saving}
        />

        {/* Policies */}

        <PolicySettings
          policies={policies}
          setPolicies={setPolicies}
          onSave={handleSavePolicies}
          saving={saving}
        />

        {/* SEO */}

        <SEOSettings
          seo={seo}
          setSeo={setSeo}
          onSave={handleSaveSEO}
          saving={saving}
        />

        {/* Theme */}

        <ThemeSettings
          theme={theme}
          setTheme={setTheme}
          onSave={handleSaveTheme}
          saving={saving}
        />

      </div>

    </div>
  );
  };

export default WebsiteSettings;
import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import {
  toast,
} from "react-hot-toast";

// ==========================================
// Website Settings Services
// ==========================================

import {
  getWebsiteSettings,
  updateLogo,
  updateHeroBanners,
  updateHomepageSettings,
  updateContactSettings,
  updateSocialSettings,
  updateAboutSettings,
  updatePolicySettings,
  updateThemeSettings,
} from "../../services/websiteSettingService";

// ==========================================
// Components
// ==========================================

import SettingsAccordion from "../../components/admin/settings/SettingsAccordion";

// ==========================================
// Theme Context
// ==========================================

import {
  useTheme,
} from "../../context/ThemeContext";

const WebsiteSettings = () => {
  const navigate = useNavigate();

  // ==========================================
  // Global Theme
  // ==========================================

  const {
    updateLocalTheme,
    refreshTheme,
  } = useTheme();

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ==========================================
  // Main Data
  // ==========================================

  const [settings, setSettings] =
    useState(null);

  // ==========================================
  // Logo + Favicon
  // ==========================================

  const [logo, setLogo] =
    useState(null);

  const [favicon, setFavicon] =
    useState(null);

  const [
    logoPreview,
    setLogoPreview,
  ] = useState("");

  const [
    faviconPreview,
    setFaviconPreview,
  ] = useState("");

  // ==========================================
  // Hero Banners
  // ==========================================

  const [
    heroBanners,
    setHeroBanners,
  ] = useState([]);

  // ==========================================
  // Homepage
  // ==========================================

  const [
    homepage,
    setHomepage,
  ] = useState({
    homepageBanners: [],
    homepageSections: {},
  });

  // ==========================================
  // Other Settings
  // ==========================================

  const [
    contact,
    setContact,
  ] = useState({});

  const [
    social,
    setSocial,
  ] = useState({});

  const [
    about,
    setAbout,
  ] = useState({});

  const [
    policies,
    setPolicies,
  ] = useState({});

  const [
    seo,
    setSeo,
  ] = useState({});

  const [
    theme,
    setTheme,
  ] = useState({});

  // ==========================================
  // Fetch Website Settings
  // ==========================================

  const fetchWebsiteSettings =
    async () => {
      try {
        setLoading(true);

        const res =
          await getWebsiteSettings();

        // Supports:
        //
        // {
        //   success: true,
        //   data: {...}
        // }
        //
        // OR direct settings object

        const data =
          res?.data || res;

        if (!data) {
          throw new Error(
            "Website settings not found."
          );
        }

        // ======================================
        // Main Settings
        // ======================================

        setSettings(data);

        // ======================================
        // Logo + Favicon
        // ======================================

        setLogo(null);

        setFavicon(null);

        setLogoPreview(
          data?.logo || ""
        );

        setFaviconPreview(
          data?.favicon || ""
        );

        // ======================================
        // Hero Banners
        // ======================================

        setHeroBanners(
          (
            data?.heroBanners || []
          ).map((banner) => ({
            ...banner,

            preview:
              banner?.image || "",
          }))
        );

        // ======================================
        // Homepage
        // ======================================

        setHomepage({
          homepageBanners:
            data?.homepageBanners ||
            [],

          homepageSections:
            data?.homepageSections ||
            {},
        });

        // ======================================
        // Contact
        // ======================================

        setContact(
          data?.contact || {}
        );

        // ======================================
        // Social
        // ======================================

        setSocial(
          data?.social || {}
        );

        // ======================================
        // About
        // ======================================

        setAbout(
          data?.about || {}
        );

        // ======================================
        // Policies
        // ======================================

        setPolicies(
          data?.policies || {}
        );

        // ======================================
        // SEO
        // ======================================

        setSeo(
          data?.seo || {}
        );

        // ======================================
        // Theme
        // ======================================

        setTheme(
          data?.theme || {}
        );
      } catch (error) {
        console.error(
          "Fetch Website Settings Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to load website settings."
        );
      } finally {
        setLoading(false);
      }
    };

  // ==========================================
  // Initial Fetch
  // ==========================================

  useEffect(() => {
    fetchWebsiteSettings();
  }, []);

  // ==========================================
  // Save Logo
  // ==========================================

  const handleSaveLogo =
    async () => {
      try {
        setSaving(true);

        await updateLogo({
          logo,
          favicon,
        });

        await fetchWebsiteSettings();

        toast.success(
          "Logo updated successfully."
        );
      } catch (error) {
        console.error(
          "Logo Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update logo."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save Hero Banners
  // ==========================================

  const handleSaveHero =
    async () => {
      try {
        setSaving(true);

        await updateHeroBanners(
          heroBanners
        );

        await fetchWebsiteSettings();

        toast.success(
          "Hero banners updated successfully."
        );
      } catch (error) {
        console.error(
          "Hero Banner Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update hero banners."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save Homepage
  // ==========================================

  const handleSaveHomepage =
    async () => {
      try {
        setSaving(true);

        await updateHomepageSettings(
          homepage
        );

        toast.success(
          "Homepage updated successfully."
        );
      } catch (error) {
        console.error(
          "Homepage Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update homepage."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save Contact
  // ==========================================

  const handleSaveContact =
    async () => {
      try {
        setSaving(true);

        await updateContactSettings(
          contact
        );

        toast.success(
          "Contact settings updated successfully."
        );
      } catch (error) {
        console.error(
          "Contact Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update contact settings."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save Social
  // ==========================================

  const handleSaveSocial =
    async () => {
      try {
        setSaving(true);

        await updateSocialSettings(
          social
        );

        toast.success(
          "Social links updated successfully."
        );
      } catch (error) {
        console.error(
          "Social Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update social settings."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save About
  // ==========================================

  const handleSaveAbout =
    async () => {
      try {
        setSaving(true);

        await updateAboutSettings(
          about
        );

        toast.success(
          "About section updated successfully."
        );
      } catch (error) {
        console.error(
          "About Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update About section."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save Policies
  // ==========================================

  const handleSavePolicies =
    async () => {
      try {
        setSaving(true);

        await updatePolicySettings(
          policies
        );

        toast.success(
          "Policies updated successfully."
        );
      } catch (error) {
        console.error(
          "Policy Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update policies."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Save Theme
  // ==========================================

  const handleSaveTheme =
    async () => {
      try {
        setSaving(true);

        // ======================================
        // Save Theme In Backend / MongoDB
        // ======================================

        const response =
          await updateThemeSettings(
            theme
          );

        // Backend may return:
        //
        // {
        //   success: true,
        //   data: {
        //      primaryColor,
        //      secondaryColor,
        //      ...
        //   }
        // }

        const savedTheme =
          response?.data ||
          theme;

        // ======================================
        // Apply New Theme Immediately
        // ======================================

        updateLocalTheme(
          savedTheme
        );

        // ======================================
        // Update Local Form State
        // ======================================

        setTheme((previous) => ({
          ...previous,
          ...savedTheme,
        }));

        // ======================================
        // Reload Theme From Backend
        //
        // This ensures ThemeContext contains
        // exactly what MongoDB has saved.
        // ======================================

        await refreshTheme();

        toast.success(
          "Theme updated successfully."
        );
      } catch (error) {
        console.error(
          "Theme Update Error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to update theme."
        );
      } finally {
        setSaving(false);
      }
    };

  // ==========================================
  // Loading UI
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-12
              w-12

              animate-spin

              rounded-full

              border-4
              border-[var(--color-primary,#355E3B)]
              border-t-transparent
            "
          />

          <p
            className="
              mt-4
              font-medium
              text-gray-600
            "
          >
            Loading Website Settings...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-gray-50

        p-4
        md:p-6
        lg:p-8
      "
    >
      {/* ======================================
          Back Button
      ====================================== */}

      <button
        type="button"
        onClick={() =>
          navigate(
            "/admin/dashboard"
          )
        }
        className="
          mb-6

          inline-flex
          items-center
          gap-2

          rounded-xl

          border
          border-gray-300

          bg-white

          px-4
          py-2.5

          text-sm
          font-semibold
          text-gray-700

          shadow-sm

          transition-all
          duration-200

          hover:border-[var(--color-primary,#355E3B)]
          hover:text-[var(--color-primary,#355E3B)]
        "
      >
        <ArrowLeft size={18} />

        Back to Dashboard
      </button>

      {/* ======================================
          Header
      ====================================== */}

      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          Website Settings
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Manage your complete website
          from one place.
        </p>
      </div>

      {/* ======================================
          Settings Accordion
      ====================================== */}

      <SettingsAccordion
        // ====================================
        // Logo
        // ====================================

        logoProps={{
          logo,

          favicon,

          logoPreview,

          faviconPreview,

          setLogo,

          setFavicon,

          setLogoPreview,

          setFaviconPreview,

          onSave:
            handleSaveLogo,

          saving,
        }}

        // ====================================
        // Hero
        // ====================================

        heroProps={{
          heroBanners,

          setHeroBanners,

          onSave:
            handleSaveHero,

          saving,
        }}

        // ====================================
        // Homepage
        // ====================================

        homepageProps={{
          homepage,

          setHomepage,

          onSave:
            handleSaveHomepage,

          saving,
        }}

        // ====================================
        // Contact
        // ====================================

        contactProps={{
          contact,

          setContact,

          onSave:
            handleSaveContact,

          saving,
        }}

        // ====================================
        // Social
        // ====================================

        socialProps={{
          social,

          setSocial,

          onSave:
            handleSaveSocial,

          saving,
        }}

        // ====================================
        // About
        // ====================================

        aboutProps={{
          about,

          setAbout,

          onSave:
            handleSaveAbout,

          saving,
        }}

        // ====================================
        // Policies
        // ====================================

        policyProps={{
          policies,

          setPolicies,

          onSave:
            handleSavePolicies,

          saving,
        }}

        // ====================================
        // Theme
        // ====================================

        themeProps={{
          theme,

          setTheme,

          onSave:
            handleSaveTheme,

          saving,
        }}
      />
    </div>
  );
};

export default WebsiteSettings;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

// ==========================================
// Website Settings Services
// ==========================================

import {
  updateLogo,
  updateHeroBanners,
  // updateHomepageSettings,
  updateContactSettings,
  updateSocialSettings,
  updateAboutSettings,
  updatePolicySettings,
  updateThemeSettings,
} from "../../services/websiteSettingService";

// ==========================================
// React Query Website Settings
// ==========================================

import useWebsiteSettings from "../../hooks/useWebsiteSettings";

// ==========================================
// Components
// ==========================================

import SettingsAccordion from "../../components/admin/settings/SettingsAccordion";

// ==========================================
// Website Settings
// ==========================================

const WebsiteSettings = () => {
  const navigate = useNavigate();

  // ==========================================
  // React Query - Website Settings
  // ==========================================

  const {
    data,
    isLoading,
    isError,
  } = useWebsiteSettings();

  // ==========================================
  // Normalize API Response
  //
  // Supports:
  // { success: true, data: {...} }
  //
  // OR
  //
  // direct settings object
  // ==========================================

  const websiteSettings =
    data?.data || data || null;

  // ==========================================
  // Saving State
  // ==========================================

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
  // Sync React Query Data
  // With Local Form States
  // ==========================================

  useEffect(() => {
    if (!websiteSettings) {
      return;
    }

    // ========================================
    // Main Settings
    // ========================================

    setSettings(
      websiteSettings
    );

    // ========================================
    // Logo + Favicon
    // ========================================

    setLogo(null);

    setFavicon(null);

    setLogoPreview(
      websiteSettings?.logo || ""
    );

    setFaviconPreview(
      websiteSettings?.favicon || ""
    );

    // ========================================
    // Hero Banners
    // ========================================

    setHeroBanners(
      (
        websiteSettings?.heroBanners ||
        []
      ).map((banner) => ({
        ...banner,

        preview:
          banner?.image || "",
      }))
    );

  
    // ========================================
    // Contact
    // ========================================

    setContact(
      websiteSettings?.contact ||
        {}
    );

    // ========================================
    // Social
    // ========================================

    setSocial(
      websiteSettings?.social ||
        {}
    );

    // ========================================
    // About
    // ========================================

    setAbout(
      websiteSettings?.about ||
        {}
    );

    // ========================================
    // Policies
    // ========================================

    setPolicies(
      websiteSettings?.policies ||
        {}
    );

    // ========================================
    // SEO
    // ========================================

    setSeo(
      websiteSettings?.seo ||
        {}
    );

    // ========================================
    // Theme
    // ========================================

    setTheme(
      websiteSettings?.theme ||
        {}
    );
  }, [websiteSettings]);

  // ==========================================
  // API Error
  // ==========================================

  useEffect(() => {
    if (!isError) {
      return;
    }

    toast.error(
      "Failed to load website settings."
    );
  }, [isError]);

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
        // Save Theme To Backend / MongoDB
        // ======================================

        const response =
          await updateThemeSettings(
            theme
          );

        const savedTheme =
          response?.data ||
          theme;

        // ======================================
        // Update Local Form State
        // ======================================

        setTheme((previous) => ({
          ...previous,
          ...savedTheme,
        }));

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

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-gray-50
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
  // Error UI
  // ==========================================

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-gray-50
          p-6
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            bg-white
            p-8
            text-center
            shadow-lg
          "
        >
          <h2
            className="
              text-xl
              font-bold
              text-gray-800
            "
          >
            Unable to Load Website Settings
          </h2>

          <p
            className="
              mt-3
              text-gray-500
            "
          >
            Please refresh the page and
            try again.
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="
              mt-6
              rounded-xl
              bg-[var(--color-primary,#355E3B)]
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            Retry
          </button>
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
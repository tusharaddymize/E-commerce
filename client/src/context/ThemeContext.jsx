
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWebsiteSettings,
} from "../services/websiteSettingService";

// ==========================================
// Theme Context
// ==========================================

const ThemeContext = createContext(null);

// ==========================================
// Default Theme
// ==========================================

const defaultTheme = {
  primaryColor: "#355E3B",
  secondaryColor: "#1E3422",
  accentColor: "#f59e0b",
  buttonColor: "#355E3B",

  darkMode: false,

  fontFamily: "Inter",

  borderRadius: "12px",

  containerWidth: "1280px",
};

// ==========================================
// Local Storage Keys
// ==========================================

const SETTINGS_STORAGE_KEY =
  "websiteSettings";

const THEME_STORAGE_KEY =
  "websiteTheme";

// ==========================================
// Get Cached Settings
// ==========================================

const getCachedSettings = () => {
  try {
    const cachedSettings =
      localStorage.getItem(
        SETTINGS_STORAGE_KEY
      );

    if (!cachedSettings) {
      return null;
    }

    return JSON.parse(cachedSettings);

  } catch (error) {
    console.error(
      "Failed to read cached website settings:",
      error
    );

    return null;
  }
};

// ==========================================
// Get Cached Theme
// ==========================================

const getCachedTheme = () => {
  try {
    const cachedTheme =
      localStorage.getItem(
        THEME_STORAGE_KEY
      );

    if (!cachedTheme) {
      return defaultTheme;
    }

    return {
      ...defaultTheme,
      ...JSON.parse(cachedTheme),
    };

  } catch (error) {
    console.error(
      "Failed to read cached theme:",
      error
    );

    return defaultTheme;
  }
};

// ==========================================
// Theme Provider
// ==========================================

export const ThemeProvider = ({
  children,
}) => {

  // ========================================
  // Cached Theme
  // ========================================

  const [theme, setTheme] = useState(
    getCachedTheme
  );

  // ========================================
  // Complete Website Settings
  // ========================================

  const [websiteSettings, setWebsiteSettings] =
    useState(getCachedSettings);

  // ========================================
  // Loading State
  // ========================================

  const [themeLoading, setThemeLoading] =
    useState(false);

  // ========================================
  // Apply Theme Globally
  // ========================================

  const applyTheme = (themeData = {}) => {

    const root =
      document.documentElement;

    // ======================================
    // Safe Values
    // ======================================

    const primaryColor =
      themeData?.primaryColor ||
      defaultTheme.primaryColor;

    const secondaryColor =
      themeData?.secondaryColor ||
      defaultTheme.secondaryColor;

    const accentColor =
      themeData?.accentColor ||
      defaultTheme.accentColor;

    const buttonColor =
      themeData?.buttonColor ||
      defaultTheme.buttonColor;

    const borderRadius =
      themeData?.borderRadius ||
      defaultTheme.borderRadius;

    const containerWidth =
      themeData?.containerWidth ||
      defaultTheme.containerWidth;

    const fontFamily =
      themeData?.fontFamily ||
      defaultTheme.fontFamily;

    // ======================================
    // Primary Color
    // ======================================

    root.style.setProperty(
      "--color-primary",
      primaryColor
    );

    root.style.setProperty(
      "--primary-color",
      primaryColor
    );

    // ======================================
    // Secondary Color
    // ======================================

    root.style.setProperty(
      "--color-secondary",
      secondaryColor
    );

    root.style.setProperty(
      "--secondary-color",
      secondaryColor
    );

    // ======================================
    // Accent Color
    // ======================================

    root.style.setProperty(
      "--color-accent",
      accentColor
    );

    root.style.setProperty(
      "--accent-color",
      accentColor
    );

    // ======================================
    // Button Color
    // ======================================

    root.style.setProperty(
      "--color-button",
      buttonColor
    );

    root.style.setProperty(
      "--button-color",
      buttonColor
    );

    // ======================================
    // Border Radius
    // ======================================

    root.style.setProperty(
      "--border-radius",
      borderRadius
    );

    root.style.setProperty(
      "--theme-radius",
      borderRadius
    );

    // ======================================
    // Container Width
    // ======================================

    root.style.setProperty(
      "--container-width",
      containerWidth
    );

    // ======================================
    // Font Family
    // ======================================

    root.style.setProperty(
      "--font-family",
      fontFamily
    );
document.body.style.fontFamily =
  fontFamily + ", sans-serif";

    // ======================================
    // Dark Mode
    // ======================================

    if (themeData?.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // ========================================
  // Apply Theme Whenever Theme Changes
  // ========================================

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // ========================================
  // Apply Favicon
  // ========================================

  const applyFavicon = (faviconUrl) => {

    if (!faviconUrl) return;

    let link = document.querySelector(
      "link[rel~='icon']"
    );

    if (!link) {
      link = document.createElement("link");

      link.rel = "icon";

      document.head.appendChild(link);
    }

    link.type = "image/png";

    link.href = faviconUrl;
  };

  // ========================================
  // Apply SEO
  // ========================================

  const applySEO = (seo = {}) => {

    // ======================================
    // Title
    // ======================================

    if (seo?.title) {
      document.title = seo.title;
    }

    // ======================================
    // Meta Description
    // ======================================

    if (seo?.description) {

      let description =
        document.querySelector(
          'meta[name="description"]'
        );

      if (!description) {

        description =
          document.createElement("meta");

        description.name =
          "description";

        document.head.appendChild(
          description
        );
      }

      description.content =
        seo.description;
    }
  };

  // ========================================
  // Apply Cached Website Settings
  // Immediately on Page Load
  // ========================================

  useEffect(() => {

    if (!websiteSettings) return;

    // ======================================
    // Cached Theme
    // ======================================

    const cachedTheme = {
      ...defaultTheme,
      ...(websiteSettings?.theme || {}),
    };

    setTheme(cachedTheme);

    // ======================================
    // Cached Favicon
    // ======================================

    if (websiteSettings?.favicon) {
      applyFavicon(
        websiteSettings.favicon
      );
    }

    // ======================================
    // Cached SEO
    // ======================================

    if (websiteSettings?.seo) {
      applySEO(
        websiteSettings.seo
      );
    }

  }, []);

  // ========================================
  // Fetch Latest Website Settings
  // ========================================

  const fetchWebsiteSettings =
    async () => {

      try {

        setThemeLoading(true);

        // ==================================
        // ONE API CALL
        // ==================================

        const response =
          await getWebsiteSettings();

        const settings =
          response?.data || response;

        if (!settings) return;

        // ==================================
        // Save Complete Settings
        // ==================================

        setWebsiteSettings(
          settings
        );

        // ==================================
        // Save Settings to LocalStorage
        // ==================================

        localStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(settings)
        );

        // ==================================
        // Get Latest Theme
        // ==================================

        const latestTheme = {
          ...defaultTheme,
          ...(settings?.theme || {}),
        };

        // ==================================
        // Update Theme
        // ==================================

        setTheme(latestTheme);

        // ==================================
        // Save Theme Separately
        // ==================================

        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify(
            latestTheme
          )
        );

        // ==================================
        // Apply Theme Immediately
        // ==================================

        applyTheme(
          latestTheme
        );

        // ==================================
        // Apply Favicon
        // ==================================

        if (settings?.favicon) {

          applyFavicon(
            settings.favicon
          );
        }

        // ==================================
        // Apply SEO
        // ==================================

        if (settings?.seo) {

          applySEO(
            settings.seo
          );
        }

      } catch (error) {

        console.error(
          "Failed to load website settings:",
          error
        );

      } finally {

        setThemeLoading(false);
      }
    };

  // ========================================
  // Load Latest Settings
  // ========================================

  useEffect(() => {

    fetchWebsiteSettings();

  }, []);

  // ========================================
  // Update Theme Locally
  // Used After Admin Saves Theme
  // ========================================

  const updateLocalTheme = (
    newTheme = {}
  ) => {

    setTheme(
      (previousTheme) => {

        const updatedTheme = {
          ...previousTheme,
          ...newTheme,
        };

        // ================================
        // Save Theme
        // ================================

        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify(
            updatedTheme
          )
        );

        // ================================
        // Update Complete Settings
        // ================================

        setWebsiteSettings(
          (previousSettings) => {

            const updatedSettings = {
              ...(previousSettings || {}),
              theme: updatedTheme,
            };

            // ============================
            // Save Complete Settings
            // ============================

            localStorage.setItem(
              SETTINGS_STORAGE_KEY,
              JSON.stringify(
                updatedSettings
              )
            );

            return updatedSettings;
          }
        );

        // ================================
        // Apply Immediately
        // ================================

        applyTheme(
          updatedTheme
        );

        return updatedTheme;
      }
    );
  };

  // ========================================
  // Update Complete Website Settings
  // ========================================

  const updateLocalSettings = (
    newSettings = {}
  ) => {

    setWebsiteSettings(
      (previousSettings) => {

        const updatedSettings = {
          ...(previousSettings || {}),
          ...newSettings,
        };

        // ================================
        // Save Settings
        // ================================

        localStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(
            updatedSettings
          )
        );

        // ================================
        // Theme
        // ================================

        if (newSettings?.theme) {

          const updatedTheme = {
            ...defaultTheme,
            ...newSettings.theme,
          };

          setTheme(
            updatedTheme
          );

          localStorage.setItem(
            THEME_STORAGE_KEY,
            JSON.stringify(
              updatedTheme
            )
          );

          applyTheme(
            updatedTheme
          );
        }

        // ================================
        // Favicon
        // ================================

        if (newSettings?.favicon) {

          applyFavicon(
            newSettings.favicon
          );
        }

        // ================================
        // SEO
        // ================================

        if (newSettings?.seo) {

          applySEO(
            newSettings.seo
          );
        }

        return updatedSettings;
      }
    );
  };

  // ========================================
  // Provider
  // ========================================

  return (
    <ThemeContext.Provider
      value={{
        // ================================
        // Theme
        // ================================

        theme,

        setTheme,

        // ================================
        // Complete Settings
        // ================================

        websiteSettings,

        setWebsiteSettings,

        // ================================
        // Loading
        // ================================

        themeLoading,

        // ================================
        // Refresh Latest Settings
        // ================================

        refreshTheme:
          fetchWebsiteSettings,

        // ================================
        // Update Theme
        // ================================

        updateLocalTheme,

        // ================================
        // Update Complete Settings
        // ================================

        updateLocalSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ==========================================
// Custom Theme Hook
// ==========================================

export const useTheme = () => {

  const context =
    useContext(
      ThemeContext
    );

  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};

// ==========================================
// Export
// ==========================================

export default ThemeContext;


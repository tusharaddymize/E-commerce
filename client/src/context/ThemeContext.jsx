import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import useWebsiteSettings from "../hooks/useWebsiteSettings";

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

  fontFamily: "Inter",

  borderRadius: "12px",

  containerWidth: "1280px",
};

// ==========================================
// Local Storage Keys
// ==========================================

const SETTINGS_STORAGE_KEY = "websiteSettings";
const THEME_STORAGE_KEY = "websiteTheme";

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
  // React Query Client
  // ========================================

  const queryClient =
    useQueryClient();

  // ========================================
  // Website Settings
  //
  // IMPORTANT:
  // This is the ONLY source used by
  // ThemeContext for website settings.
  //
  // React Query handles:
  // - caching
  // - deduplication
  // - background fetching
  // ========================================

  const {
    data,
    isLoading: queryLoading,
    isFetching,
    refetch,
  } = useWebsiteSettings();

  // ========================================
  // Theme State
  // ========================================

  const [theme, setTheme] =
    useState(getCachedTheme);

  // ========================================
  // Website Settings State
  // ========================================

  const [
    websiteSettings,
    setWebsiteSettings,
  ] = useState(getCachedSettings);

  // ========================================
  // Normalize API Response
  // ========================================

  const latestSettings =
    data?.data || data || null;

  // ========================================
  // Loading
  //
  // If localStorage has data,
  // don't show full-page loading.
  // ========================================

  const themeLoading =
    queryLoading &&
    !websiteSettings;

  // ========================================
  // Apply Theme Globally
  // ========================================

  const applyTheme = (
    themeData = {}
  ) => {
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
    // Primary
    // ======================================

    root.style.setProperty(
      "--color-primary",
      primaryColor
    );

    root.style.setProperty(
      "--primary-color",
      primaryColor
    );

    root.style.setProperty(
      "--primary",
      primaryColor
    );

    root.style.setProperty(
      "--primary-light",
      primaryColor
    );

    // ======================================
    // Secondary
    // ======================================

    root.style.setProperty(
      "--color-secondary",
      secondaryColor
    );

    root.style.setProperty(
      "--secondary-color",
      secondaryColor
    );

    root.style.setProperty(
      "--secondary",
      secondaryColor
    );

    // ======================================
    // Accent
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
    // Button
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

    root.style.setProperty(
      "--radius",
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
      `${fontFamily}, sans-serif`;
  };

  // ==========================================
  // Apply Theme Immediately
  // ==========================================

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // ==========================================
  // Apply Favicon
  // ==========================================

  const applyFavicon = (
    faviconUrl
  ) => {
    if (!faviconUrl) {
      return;
    }

    let link =
      document.querySelector(
        "link[rel~='icon']"
      );

    if (!link) {
      link =
        document.createElement(
          "link"
        );

      link.rel = "icon";

      document.head.appendChild(
        link
      );
    }

    link.type = "image/png";
    link.href = faviconUrl;
  };

  // ==========================================
  // Apply SEO
  // ==========================================

  const applySEO = (
    seo = {}
  ) => {
    // ======================================
    // Title
    // ======================================

    if (seo?.title) {
      document.title =
        seo.title;
    }

    // ======================================
    // Description
    // ======================================

    if (seo?.description) {
      let description =
        document.querySelector(
          'meta[name="description"]'
        );

      if (!description) {
        description =
          document.createElement(
            "meta"
          );

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

  // ==========================================
  // Apply Cached Settings Immediately
  // ==========================================

  useEffect(() => {
    if (!websiteSettings) {
      return;
    }

    const cachedTheme = {
      ...defaultTheme,
      ...(websiteSettings?.theme ||
        {}),
    };

    setTheme(cachedTheme);

    if (
      websiteSettings?.favicon
    ) {
      applyFavicon(
        websiteSettings.favicon
      );
    }

    if (
      websiteSettings?.seo
    ) {
      applySEO(
        websiteSettings.seo
      );
    }
  }, []);

  // ==========================================
  // Apply React Query Settings
  // ==========================================

  useEffect(() => {
    if (!latestSettings) {
      return;
    }

    // ======================================
    // Save Complete Settings
    // ======================================

    setWebsiteSettings(
      latestSettings
    );

    // ======================================
    // LocalStorage
    // ======================================

    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(
        latestSettings
      )
    );

    // ======================================
    // Latest Theme
    // ======================================

    const latestTheme = {
      ...defaultTheme,
      ...(latestSettings?.theme ||
        {}),
    };

    // ======================================
    // Update Theme
    // ======================================

    setTheme(latestTheme);

    // ======================================
    // Save Theme
    // ======================================

    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify(
        latestTheme
      )
    );

    // ======================================
    // Apply Theme
    // ======================================

    applyTheme(latestTheme);

    // ======================================
    // Favicon
    // ======================================

    if (
      latestSettings?.favicon
    ) {
      applyFavicon(
        latestSettings.favicon
      );
    }

    // ======================================
    // SEO
    // ======================================

    if (
      latestSettings?.seo
    ) {
      applySEO(
        latestSettings.seo
      );
    }
  }, [latestSettings]);

  // ==========================================
  // Refresh Website Settings
  // ==========================================

  const refreshTheme = async () => {
    try {
      const result =
        await refetch();

      return result?.data;
    } catch (error) {
      console.error(
        "Failed to refresh website settings:",
        error
      );

      return null;
    }
  };

  // ==========================================
  // Update Theme Locally
  // ==========================================

  const updateLocalTheme = (
    newTheme = {}
  ) => {
    setTheme(
      (previousTheme) => {
        const updatedTheme = {
          ...previousTheme,
          ...newTheme,
        };

        // Save Theme
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify(
            updatedTheme
          )
        );

        // Update Website Settings
        setWebsiteSettings(
          (previousSettings) => {
            const updatedSettings = {
              ...(previousSettings ||
                {}),
              theme: updatedTheme,
            };

            localStorage.setItem(
              SETTINGS_STORAGE_KEY,
              JSON.stringify(
                updatedSettings
              )
            );

            return updatedSettings;
          }
        );

        // Apply Theme
        applyTheme(
          updatedTheme
        );

        return updatedTheme;
      }
    );

    // ======================================
    // Update React Query Cache
    // ======================================

    queryClient.setQueryData(
      ["website-settings"],
      (previousData) => {
        const previousSettings =
          previousData?.data ||
          previousData ||
          {};

        const updatedSettings = {
          ...previousSettings,
          theme: {
            ...(previousSettings?.theme ||
              {}),
            ...newTheme,
          },
        };

        return {
          ...updatedSettings,
        };
      }
    );
  };

  // ==========================================
  // Update Complete Website Settings
  // ==========================================

  const updateLocalSettings = (
    newSettings = {}
  ) => {
    setWebsiteSettings(
      (previousSettings) => {
        const updatedSettings = {
          ...(previousSettings ||
            {}),
          ...newSettings,
        };

        // ==================================
        // Save Settings
        // ==================================

        localStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(
            updatedSettings
          )
        );

        // ==================================
        // Theme
        // ==================================

        if (newSettings?.theme) {
          const updatedTheme = {
            ...defaultTheme,
            ...(updatedSettings.theme ||
              {}),
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

        // ==================================
        // Favicon
        // ==================================

        if (
          newSettings?.favicon
        ) {
          applyFavicon(
            newSettings.favicon
          );
        }

        // ==================================
        // SEO
        // ==================================

        if (
          newSettings?.seo
        ) {
          applySEO(
            newSettings.seo
          );
        }

        return updatedSettings;
      }
    );

    // ======================================
    // Update React Query Cache
    // ======================================

    queryClient.setQueryData(
      ["website-settings"],
      (previousData) => {
        const previousSettings =
          previousData?.data ||
          previousData ||
          {};

        const updatedSettings = {
          ...previousSettings,
          ...newSettings,
        };

        return {
          ...updatedSettings,
        };
      }
    );
  };

  // ==========================================
  // Provider
  // ==========================================

  return (
    <ThemeContext.Provider
      value={{
        // ====================================
        // Theme
        // ====================================

        theme,

        setTheme,

        // ====================================
        // Website Settings
        // ====================================

        websiteSettings,

        setWebsiteSettings,

        // ====================================
        // Loading
        // ====================================

        themeLoading,

        websiteSettingsLoading:
          themeLoading,

        websiteSettingsFetching:
          isFetching,

        // ====================================
        // Refresh
        // ====================================

        refreshTheme,

        // ====================================
        // Update Theme
        // ====================================

        updateLocalTheme,

        // ====================================
        // Update Settings
        // ====================================

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
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};

// ==========================================
// Default Export
// ==========================================

export default ThemeContext;
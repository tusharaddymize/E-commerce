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
// Used only when backend theme unavailable
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
// Theme Provider
// ==========================================

export const ThemeProvider = ({
  children,
}) => {
  // ========================================
  // Theme State
  // ========================================

  const [theme, setTheme] =
    useState(defaultTheme);

  const [
    themeLoading,
    setThemeLoading,
  ] = useState(true);

  // ========================================
  // Fetch Theme From Backend
  // ========================================

  const fetchTheme = async () => {
    try {
      setThemeLoading(true);

      const response =
        await getWebsiteSettings();

      // Supports:
      //
      // {
      //   success: true,
      //   data: {...}
      // }
      //
      // OR direct settings object

      const settings =
        response?.data || response;

      const savedTheme =
        settings?.theme || {};

      // Merge saved theme with fallback theme

      setTheme({
        ...defaultTheme,
        ...savedTheme,
      });
    } catch (error) {
      console.error(
        "Failed to load website theme:",
        error
      );

      // Use default only if API fails

      setTheme(defaultTheme);
    } finally {
      setThemeLoading(false);
    }
  };

  // ========================================
  // Load Theme When Website Starts
  // ========================================

  useEffect(() => {
    fetchTheme();
  }, []);

  // ========================================
  // Apply Theme Globally
  // ========================================
  //
  // IMPORTANT:
  //
  // Existing website uses:
  //
  // --primary-color
  // --secondary-color
  // --accent-color
  // --button-color
  // --theme-radius
  //
  // New Product Page uses:
  //
  // --color-primary
  // --color-secondary
  // --color-accent
  // --color-button
  // --border-radius
  //
  // Therefore BOTH variable systems
  // are maintained here.
  // ========================================

  useEffect(() => {
    const root =
      document.documentElement;

    // ======================================
    // Get Safe Theme Values
    // ======================================

    const primaryColor =
      theme?.primaryColor ||
      defaultTheme.primaryColor;

    const secondaryColor =
      theme?.secondaryColor ||
      defaultTheme.secondaryColor;

    const accentColor =
      theme?.accentColor ||
      defaultTheme.accentColor;

    const buttonColor =
      theme?.buttonColor ||
      defaultTheme.buttonColor;

    const borderRadius =
      theme?.borderRadius ||
      defaultTheme.borderRadius;

    const containerWidth =
      theme?.containerWidth ||
      defaultTheme.containerWidth;

    const fontFamily =
      theme?.fontFamily ||
      defaultTheme.fontFamily;

    // ======================================
    // PRIMARY COLOR
    // ======================================

    // New Product Page

    root.style.setProperty(
      "--color-primary",
      primaryColor
    );

    // Existing Landing Page / Components

    root.style.setProperty(
      "--primary-color",
      primaryColor
    );

    // ======================================
    // SECONDARY COLOR
    // ======================================

    // New Product Page

    root.style.setProperty(
      "--color-secondary",
      secondaryColor
    );

    // Existing Landing Page / Components

    root.style.setProperty(
      "--secondary-color",
      secondaryColor
    );

    // ======================================
    // ACCENT COLOR
    // ======================================

    // New Product Page

    root.style.setProperty(
      "--color-accent",
      accentColor
    );

    // Existing Landing Page / Components

    root.style.setProperty(
      "--accent-color",
      accentColor
    );

    // ======================================
    // BUTTON COLOR
    // ======================================

    // New Product Page

    root.style.setProperty(
      "--color-button",
      buttonColor
    );

    // Existing Landing Page / Components

    root.style.setProperty(
      "--button-color",
      buttonColor
    );

    // ======================================
    // BORDER RADIUS
    // ======================================

    // New components

    root.style.setProperty(
      "--border-radius",
      borderRadius
    );

    // Existing components

    root.style.setProperty(
      "--theme-radius",
      borderRadius
    );

    // ======================================
    // CONTAINER WIDTH
    // ======================================

    root.style.setProperty(
      "--container-width",
      containerWidth
    );

    // ======================================
    // FONT FAMILY
    // ======================================

    root.style.setProperty(
      "--font-family",
      fontFamily
    );

    document.body.style.fontFamily =
      `"${fontFamily}", sans-serif`;

    // ======================================
    // DARK MODE
    // ======================================

    if (theme?.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // ========================================
  // Update Theme Immediately
  // ========================================
  //
  // Admin Save Theme ke baad use hoga.
  //
  // Page reload ki zarurat nahi.
  // ========================================

  const updateLocalTheme = (
    newTheme = {}
  ) => {
    setTheme((previousTheme) => ({
      ...previousTheme,
      ...newTheme,
    }));
  };

  // ========================================
  // Provider
  // ========================================

  return (
    <ThemeContext.Provider
      value={{
        // Current theme
        theme,

        // Direct state setter
        setTheme,

        // Loading
        themeLoading,

        // Fetch latest theme from MongoDB
        refreshTheme: fetchTheme,

        // Change theme immediately
        updateLocalTheme,
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
// Export
// ==========================================

export default ThemeContext;
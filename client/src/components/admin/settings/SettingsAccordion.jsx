import { useState } from "react";

import { FaImage } from "react-icons/fa";
import { FiPhone, FiShare2 } from "react-icons/fi";
import { MdInfoOutline, MdPolicy } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";

import SettingSection from "./SettingSection";

import LogoSettings from "./LogoSettings";
import HeroBannerSettings from "./HeroBannerSettings";
import ContactSettings from "./ContactSettings";
import SocialSettings from "./SocialSettings";
import AboutSettings from "./AboutSettings";
import PolicySettings from "./PolicySettings";
import ThemeSettings from "./ThemeSettings";

const SettingsAccordion = ({
  logoProps,
  heroProps,
  contactProps,
  socialProps,
  aboutProps,
  policyProps,
  seoProps,
  themeProps,
}) => {
  const [openSection, setOpenSection] = useState("logo");

  // ==========================================
  // Toggle Section
  // ==========================================

  const toggleSection = (section) => {
    setOpenSection((prev) =>
      prev === section ? "" : section
    );
  };

  return (
    <div className="space-y-5">

      {/* ==========================================
          LOGO & FAVICON
      ========================================== */}

      <SettingSection
        title="Logo & Favicon"
        icon={<FaImage />}
        isOpen={openSection === "logo"}
        onToggle={() => toggleSection("logo")}
      >
        <LogoSettings {...logoProps} />
      </SettingSection>


      {/* ==========================================
          HERO BANNERS
      ========================================== */}

      <SettingSection
        title="Hero Banners"
        icon={<FaImage />}
        isOpen={openSection === "hero"}
        onToggle={() => toggleSection("hero")}
      >
        <HeroBannerSettings {...heroProps} />
      </SettingSection>


      {/* ==========================================
          CONTACT INFORMATION
      ========================================== */}

      <SettingSection
        title="Contact Information"
        icon={<FiPhone />}
        isOpen={openSection === "contact"}
        onToggle={() => toggleSection("contact")}
      >
        <ContactSettings {...contactProps} />
      </SettingSection>


      {/* ==========================================
          SOCIAL MEDIA LINKS
      ========================================== */}

      <SettingSection
        title="Social Media Links"
        icon={<FiShare2 />}
        isOpen={openSection === "social"}
        onToggle={() => toggleSection("social")}
      >
        <SocialSettings {...socialProps} />
      </SettingSection>


      {/* ==========================================
          ABOUT US
      ========================================== */}

      <SettingSection
        title="About Us"
        icon={<MdInfoOutline />}
        isOpen={openSection === "about"}
        onToggle={() => toggleSection("about")}
      >
        <AboutSettings {...aboutProps} />
      </SettingSection>


      {/* ==========================================
          POLICY PAGES
      ========================================== */}

      <SettingSection
        title="Policy Pages"
        icon={<MdPolicy />}
        isOpen={openSection === "policy"}
        onToggle={() => toggleSection("policy")}
      >
        <PolicySettings {...policyProps} />
      </SettingSection>


      {/* ==========================================
          THEME SETTINGS
      ========================================== */}

      <SettingSection
        title="Theme Settings"
        icon={<IoColorPaletteOutline />}
        isOpen={openSection === "theme"}
        onToggle={() => toggleSection("theme")}
      >
        <ThemeSettings {...themeProps} />
      </SettingSection>

    </div>
  );
};

export default SettingsAccordion;
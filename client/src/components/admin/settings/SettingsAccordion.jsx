import { useState } from "react";

import { FaImage } from "react-icons/fa";
import { FiHome, FiPhone, FiShare2 } from "react-icons/fi";
import { MdInfoOutline, MdPolicy } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";

import SettingSection from "./SettingSection";

import LogoSettings from "./LogoSettings";
import HeroBannerSettings from "./HeroBannerSettings";
import HomepageSettings from "./HomepageSettings";
import ContactSettings from "./ContactSettings";
import SocialSettings from "./SocialSettings";
import AboutSettings from "./AboutSettings";
import PolicySettings from "./PolicySettings";

import ThemeSettings from "./ThemeSettings";

const SettingsAccordion = ({
  logoProps,
  heroProps,
  homepageProps,
  contactProps,
  socialProps,
  aboutProps,
  policyProps,
  seoProps,
  themeProps,
}) => {
  const [openSection, setOpenSection] = useState("logo");

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  return (
    <div className="space-y-5">
      <SettingSection
        title="Logo & Favicon"
        icon={<FaImage />}
        isOpen={openSection === "logo"}
        onToggle={() => toggleSection("logo")}
      >
        <LogoSettings {...logoProps} />
      </SettingSection>

      <SettingSection
        title="Hero Banners"
        icon={<FaImage />}
        isOpen={openSection === "hero"}
        onToggle={() => toggleSection("hero")}
      >
        <HeroBannerSettings {...heroProps} />
      </SettingSection>

      <SettingSection
        title="Homepage Settings"
        icon={<FiHome />}
        isOpen={openSection === "homepage"}
        onToggle={() => toggleSection("homepage")}
      >
        <HomepageSettings {...homepageProps} />
      </SettingSection>

      <SettingSection
        title="Contact Information"
        icon={<FiPhone />}
        isOpen={openSection === "contact"}
        onToggle={() => toggleSection("contact")}
      >
        <ContactSettings {...contactProps} />
      </SettingSection>

      <SettingSection
        title="Social Media Links"
        icon={<FiShare2 />}
        isOpen={openSection === "social"}
        onToggle={() => toggleSection("social")}
      >
        <SocialSettings {...socialProps} />
      </SettingSection>

      <SettingSection
        title="About Us"
        icon={<MdInfoOutline />}
        isOpen={openSection === "about"}
        onToggle={() => toggleSection("about")}
      >
        <AboutSettings {...aboutProps} />
      </SettingSection>

      <SettingSection
        title="Policy Pages"
        icon={<MdPolicy />}
        isOpen={openSection === "policy"}
        onToggle={() => toggleSection("policy")}
      >
        <PolicySettings {...policyProps} />
      </SettingSection>

  

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
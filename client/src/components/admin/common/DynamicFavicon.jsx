import { useEffect } from "react";
import { getWebsiteSettings } from "../../../services/websiteSettingService";
const DynamicFavicon = () => {
  useEffect(() => {
    const loadFavicon = async () => {
      try {
        const response = await getWebsiteSettings();

        const settings = response?.data || response;
        const favicon = settings?.favicon;

        if (!favicon) return;

        let link = document.querySelector("link[rel~='icon']");

        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }

        link.type = "image/png";
        link.href = favicon;
      } catch (error) {
        console.error("Failed to load favicon:", error);
      }
    };

    loadFavicon();
  }, []);

  return null;
};

export default DynamicFavicon;
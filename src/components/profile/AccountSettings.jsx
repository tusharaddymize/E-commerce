import { useState } from "react";
import { motion } from "framer-motion";
import SettingToggle from "./SettingToggle";
import { FaSave } from "react-icons/fa";

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    newsletter: false,
    darkMode: false,
    twoFactor: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log(settings);

    alert("Settings Saved Successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        Account Settings
      </h2>

      <SettingToggle
        title="Email Notifications"
        description="Receive emails about account activity."
        enabled={settings.emailNotifications}
        onChange={() =>
          toggleSetting("emailNotifications")
        }
      />

      <SettingToggle
        title="SMS Notifications"
        description="Receive SMS alerts."
        enabled={settings.smsNotifications}
        onChange={() =>
          toggleSetting("smsNotifications")
        }
      />

      <SettingToggle
        title="Order Updates"
        description="Get notified when your order status changes."
        enabled={settings.orderUpdates}
        onChange={() =>
          toggleSetting("orderUpdates")
        }
      />

      <SettingToggle
        title="Newsletter"
        description="Receive offers and promotions."
        enabled={settings.newsletter}
        onChange={() =>
          toggleSetting("newsletter")
        }
      />

      <SettingToggle
        title="Dark Mode"
        description="Enable dark theme."
        enabled={settings.darkMode}
        onChange={() =>
          toggleSetting("darkMode")
        }
      />

      <SettingToggle
        title="Two Factor Authentication"
        description="Increase account security."
        enabled={settings.twoFactor}
        onChange={() =>
          toggleSetting("twoFactor")
        }
      />

      <button
        onClick={handleSave}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
      >
        <FaSave />
        Save Settings
      </button>
    </motion.div>
  );
};

export default AccountSettings;
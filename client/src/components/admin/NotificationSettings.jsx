import { useState } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  Save,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const NotificationSettings = () => {
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    userNotifications: true,
    marketingEmails: false,
    pushNotifications: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Backend API call can be added here
      // await updateNotificationSettings(settings);

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Notification settings updated successfully");
    } catch (error) {
      toast.error("Failed to update notification settings");
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ title, description, value, onChange, icon }) => (
    <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
      <div className="flex items-start gap-3">
        <div className="text-green-600 mt-1">
          {icon}
        </div>

        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          value ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-green-600" size={22} />
        <h2 className="text-xl font-bold">
          Notification Settings
        </h2>
      </div>

      <div className="space-y-4">
        <Toggle
          title="Email Notifications"
          description="Receive important account updates via email."
          value={settings.emailNotifications}
          onChange={() =>
            handleToggle("emailNotifications")
          }
          icon={<Mail size={20} />}
        />

        <Toggle
          title="Order Notifications"
          description="Get notified whenever a new order is placed."
          value={settings.orderNotifications}
          onChange={() =>
            handleToggle("orderNotifications")
          }
          icon={<Bell size={20} />}
        />

        <Toggle
          title="User Notifications"
          description="Receive alerts for new user registrations."
          value={settings.userNotifications}
          onChange={() =>
            handleToggle("userNotifications")
          }
          icon={<Bell size={20} />}
        />

        <Toggle
          title="Marketing Emails"
          description="Receive promotional emails and product updates."
          value={settings.marketingEmails}
          onChange={() =>
            handleToggle("marketingEmails")
          }
          icon={<Mail size={20} />}
        />

        <Toggle
          title="Push Notifications"
          description="Receive browser push notifications."
          value={settings.pushNotifications}
          onChange={() =>
            handleToggle("pushNotifications")
          }
          icon={<Smartphone size={20} />}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
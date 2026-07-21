import useAuth from "../hooks/useAuth";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfo from "../components/profile/ProfileInfo";
import ChangePassword from "../components/profile/ChangePassword";
import QuickActions from "../components/profile/QuickActions";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import AccountSettings from "../components/profile/AccountSettings";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar user={user} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Header */}
            <ProfileHeader user={user} />

            {/* Profile Statistics */}
            <ProfileStats user={user} />

            {/* Profile Information */}
            <ProfileInfo user={user} />

            {/* Change Password */}
            <ChangePassword />

            {/* Quick Actions */}
            <QuickActions />

            {/* Account Settings */}
            <AccountSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
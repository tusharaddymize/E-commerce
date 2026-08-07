import useAuth from "../hooks/useAuth";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfo from "../components/profile/ProfileInfo";
import ChangePassword from "../components/profile/ChangePassword";
import QuickActions from "../components/profile/QuickActions";
import ProfileSidebar from "../components/profile/ProfileSidebar";
// import AccountSettings from "../components/profile/AccountSettings";
import ProfileRecentOrders from "../components/profile/ProfileRecentOrders";

const Profile = () => {
  const { user, loading } = useAuth();

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          min-h-[60vh]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              mx-auto

              border-4
              border-[var(--primary-color,#355E3B)]
              border-t-transparent

              rounded-full
              animate-spin
            "
          />

          <p className="mt-4 text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Profile
  // ==========================================

  return (
    <main
      className="
        min-h-screen

        py-5
        sm:py-7
        lg:py-8
      "
      style={{
        backgroundColor:
          "var(--background-color, #f5f6f7)",
      }}
    >
      <div
        className="
          w-full
          max-w-[1450px]

          mx-auto

          px-3
          sm:px-5
          lg:px-8
        "
      >
        {/* ==================================== */}
        {/* Mobile Page Heading */}
        {/* ==================================== */}

        <div className="md:hidden mb-5">
          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            My Account
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Manage your profile and account
          </p>
        </div>

        {/* ==================================== */}
        {/* Main Layout */}
        {/* ==================================== */}

        <div
          className="
            grid
            grid-cols-1

            md:grid-cols-[220px_minmax(0,1fr)]
            lg:grid-cols-[250px_minmax(0,1fr)]

            gap-5
            lg:gap-7

            items-start
          "
        >
          {/* ================================== */}
          {/* Sidebar */}
          {/* ================================== */}

          <ProfileSidebar user={user} />

          {/* ================================== */}
          {/* Main Content */}
          {/* ================================== */}

          <div
            className="
              min-w-0

              space-y-5
              sm:space-y-6
            "
          >
            {/* ================================= */}
            {/* Welcome Header */}
            {/* ================================= */}

            <ProfileHeader user={user} />

            {/* ================================= */}
            {/* Account Stats */}
            {/* ================================= */}

            <ProfileStats user={user} />

            {/* ================================= */}
            {/* Recent Orders */}
            {/* ================================= */}

            <ProfileRecentOrders />

            {/* ================================= */}
            {/* Info + Quick Actions */}
            {/* ================================= */}

            <div
              className="
                grid
                grid-cols-1

                xl:grid-cols-2

                gap-5
                sm:gap-6

                items-start
              "
            >
              <ProfileInfo user={user} />

              <QuickActions />
            </div>

            {/* ================================= */}
            {/* Saved Addresses */}
            {/* ================================= */}

<section
  id="addresses"
  className="
    bg-white
    border
    border-gray-200
    shadow-sm
    rounded-2xl
    p-5
    sm:p-6
    scroll-mt-40
  "
>
  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
    Saved Addresses
  </h2>

  {user?.addresses?.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {user.addresses.map((address, index) => (
        <div
          key={index}
          className="
            border
            rounded-xl
            p-4
            bg-gray-50
          "
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">
              {address.fullName}
            </h3>

            {address.isDefault && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                Default
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {address.phone}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {address.address}
          </p>

          <p className="text-sm text-gray-600">
            {address.city}, {address.state}
          </p>

          <p className="text-sm text-gray-600">
            {address.country} - {address.pincode}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="mt-3 text-gray-500">
      No saved address found.
    </p>
  )}
</section>

            {/* ================================= */}
            {/* Change Password */}
            {/* ================================= */}

            <ChangePassword />

            {/* ================================= */}
            {/* Account Settings */}
            {/* ================================= */}

            {/* <AccountSettings /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
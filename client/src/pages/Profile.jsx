import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import useAuth from "../hooks/useAuth";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfo from "../components/profile/ProfileInfo";
import ChangePassword from "../components/profile/ChangePassword";
// import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileRecentOrders from "../components/profile/ProfileRecentOrders";

const Profile = () => {
  const navigate = useNavigate();
const { user, loading, logout } = useAuth();
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
        {/* Back to Dashboard */}
        {/* ==================================== */}

 <div className="flex items-center justify-between mb-5">
  {/* Back */}
  <button
    type="button"
    onClick={() => navigate("/")}
    className="
      inline-flex
      items-center
      gap-2
      text-sm
      sm:text-base
      font-medium
      text-gray-600
      hover:text-[#f4512a]
      transition-colors
    "
  >
    <FiArrowLeft size={19} />
    Back to Dashboard
  </button>

  {/* Logout */}
  <button
    type="button"
    onClick={() => {
      logout();
      navigate("/");
    }}
    className="
      inline-flex
      items-center
      justify-center
      px-4
      py-2
      rounded-lg
      bg-[#f4512a]
      text-white
      text-sm
      sm:text-base
      font-semibold
      hover:opacity-90
      transition
    "
  >
    Logout
  </button>
</div>

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
<div className="w-full">
       
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
            {/* Account Information */}
            {/* ================================= */}

            <ProfileInfo user={user} />

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
              {/* Header */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-2
                "
              >
                <div>
                  <h2
                    className="
                      text-lg
                      sm:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Saved Addresses
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Manage your delivery addresses
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/edit-profile")
                  }
                  className="
                    text-sm
                    font-semibold
                    text-[#f4512a]
                    hover:underline
                  "
                >
                  Add / Edit Address
                </button>
              </div>

              {/* ================================= */}
              {/* Address List */}
              {/* ================================= */}

              {user?.addresses?.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                    mt-5
                  "
                >
                  {user.addresses.map(
                    (address, index) => (
                      <div
                        key={
                          address._id ||
                          index
                        }
                        className="
                          border
                          border-gray-200
                          rounded-xl
                          p-5
                          bg-gray-50
                          hover:shadow-sm
                          transition
                        "
                      >
                        {/* Name + Default */}

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >
                          <div>
                            <h3
                              className="
                                font-bold
                                text-gray-900
                              "
                            >
                              {address.fullName ||
                                "No Name"}
                            </h3>

                            <p
                              className="
                                text-sm
                                text-gray-500
                                mt-1
                              "
                            >
                              {address.phone ||
                                "No phone"}
                            </p>
                          </div>

                          {address.isDefault && (
                            <span
                              className="
                                shrink-0
                                text-xs
                                font-semibold
                                px-3
                                py-1
                                rounded-full
                                bg-green-100
                                text-green-700
                              "
                            >
                              Default
                            </span>
                          )}
                        </div>

                        {/* Address */}

                        <div
                          className="
                            mt-4
                            text-sm
                            text-gray-600
                            leading-6
                          "
                        >
                          <p>
                            {address.address ||
                              "Address not added"}
                          </p>

                          <p>
                            {address.city || ""}
                            {address.city &&
                            address.state
                              ? ", "
                              : ""}
                            {address.state || ""}
                          </p>

                          <p>
                            {address.country ||
                              "India"}{" "}
                            -{" "}
                            {address.pincode ||
                              ""}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                /* ================================= */
                /* No Address */
                /* ================================= */

                <div
                  className="
                    mt-5
                    border
                    border-dashed
                    border-gray-300
                    rounded-xl
                    p-8
                    text-center
                  "
                >
                  <p
                    className="
                      text-gray-500
                    "
                  >
                    No saved address found.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/edit-profile"
                      )
                    }
                    className="
                      mt-4
                      inline-flex
                      items-center
                      justify-center
                      px-5
                      py-2.5
                      rounded-lg
                      text-white
                      font-semibold
                      bg-[#f4512a]
                      hover:opacity-90
                      transition
                    "
                  >
                    Add Address
                  </button>
                </div>
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
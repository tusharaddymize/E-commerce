import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiUser,
} from "react-icons/fi";

const ProfileHeader = ({ user }) => {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        shadow-sm

        p-5
        sm:p-6

        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between

        gap-4
      "
      style={{
        borderRadius:
          "var(--border-radius, 16px)",
      }}
    >
      {/* ====================================== */}
      {/* Welcome */}
      {/* ====================================== */}

      <div className="min-w-0">
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              hidden
              sm:flex

              w-10
              h-10

              items-center
              justify-center

              rounded-full

              bg-[var(--primary-color,#355E3B)]/10
              text-[var(--primary-color,#355E3B)]
            "
          >
            <FiUser size={19} />
          </div>

          <div className="min-w-0">
            <h1
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl

                font-bold
                text-gray-900

                truncate
              "
            >
              Welcome back,{" "}
              {user?.name?.split(" ")[0] ||
                "User"}{" "}
              👋
            </h1>

            <p
              className="
                mt-1
                text-sm
                sm:text-base
                text-gray-500
              "
            >
              Manage your account and track
              your activity
            </p>
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* Edit Profile */}
      {/* ====================================== */}

      <Link
        to="/edit-profile"
        className="
          flex
          items-center
          justify-center
          gap-2

          w-full
          sm:w-auto

          px-4
          py-2.5

          border
          border-[var(--primary-color,#355E3B)]

          text-[var(--primary-color,#355E3B)]

          text-sm
          font-semibold

          rounded-xl

          transition-all
          duration-200

          hover:bg-[var(--primary-color,#355E3B)]
          hover:text-white
        "
      >
        <FiEdit2 size={16} />

        Edit Profile
      </Link>
    </div>
  );
};

export default ProfileHeader;
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import EditProfileForm from "../components/profile/EditProfileForm";

const EditProfile = () => {
  return (
    <main
      className="
        min-h-screen
        bg-gray-100

        py-5
        sm:py-7
        lg:py-10
      "
    >
      <div
        className="
          w-full
          max-w-2xl

          mx-auto

          px-3
          sm:px-4
        "
      >
        {/* ====================================== */}
        {/* Back To Profile */}
        {/* ====================================== */}

        <Link
          to="/profile"
          className="
            inline-flex
            items-center
            gap-2

            mb-5
            sm:mb-6

            px-3
            sm:px-4
            py-2

            bg-white

            border
            border-gray-200

            rounded-xl

            shadow-sm

            text-sm
            font-semibold
            text-gray-700

            transition-all
            duration-200

            hover:border-[var(--primary-color,#355E3B)]
            hover:text-[var(--primary-color,#355E3B)]
            hover:shadow
          "
        >
          <FiArrowLeft size={17} />

          Back to Profile
        </Link>

        {/* ====================================== */}
        {/* Edit Profile Form */}
        {/* ====================================== */}

        <EditProfileForm />
      </div>
    </main>
  );
};

export default EditProfile;
import {
  User,
  Lock,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import SettingsProfile from "../../components/admin/SettingsProfile";
import ChangePassword from "../../components/admin/ChangePassword";
import DangerZone from "../../components/admin/DangerZone";

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* ====================================== */}
      {/* PAGE HEADER */}
      {/* ====================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-4
          mb-8
        "
      >
        <button
          type="button"
          onClick={() =>
            navigate("/admin/dashboard")
          }
          className="
            flex
            items-center
            justify-center
            gap-2

            w-fit

            px-4
            py-2.5

            bg-white

            border
            border-slate-300

            rounded-lg

            shadow-sm

            text-sm
            font-medium
            text-slate-700

            hover:bg-emerald-600
            hover:border-emerald-600
            hover:text-white

            transition
          "
        >
          <ArrowLeft size={18} />

          Back
        </button>

        <div>
          <h1
            className="
              text-2xl
              sm:text-3xl

              font-bold
              text-slate-800
            "
          >
            Account Settings
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Manage your profile, password and
            account security.
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* SETTINGS CONTENT */}
      {/* ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3

          gap-6
        "
      >
        {/* ==================================== */}
        {/* LEFT COLUMN */}
        {/* ==================================== */}

        <div className="xl:col-span-2 space-y-6">
          {/* ================================== */}
          {/* PROFILE INFORMATION */}
          {/* ================================== */}

          <section
            className="
              bg-white

              rounded-2xl

              border
              border-slate-200

              shadow-sm

              p-4
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-3

                mb-6
              "
            >
              <div
                className="
                  p-3

                  rounded-xl

                  bg-emerald-100
                "
              >
                <User
                  className="text-emerald-600"
                  size={22}
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg
                    sm:text-xl

                    font-semibold

                    text-slate-800
                  "
                >
                  Profile Information
                </h2>

                <p className="text-sm text-slate-500">
                  Update your personal details.
                </p>
              </div>
            </div>

            <SettingsProfile />
          </section>

          {/* ================================== */}
          {/* CHANGE PASSWORD */}
          {/* ================================== */}

          <section
            className="
              bg-white

              rounded-2xl

              border
              border-slate-200

              shadow-sm

              p-4
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-3

                mb-6
              "
            >
              <div
                className="
                  p-3

                  rounded-xl

                  bg-blue-100
                "
              >
                <Lock
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg
                    sm:text-xl

                    font-semibold

                    text-slate-800
                  "
                >
                  Change Password
                </h2>

                <p className="text-sm text-slate-500">
                  Update your password to keep
                  your admin account secure.
                </p>
              </div>
            </div>

            <ChangePassword />
          </section>
        </div>

        {/* ==================================== */}
        {/* RIGHT COLUMN */}
        {/* ==================================== */}

        <div className="space-y-6">
          {/* ================================== */}
          {/* DANGER ZONE */}
          {/* ================================== */}

          <section
            className="
              bg-white

              rounded-2xl

              border
              border-red-200

              shadow-sm

              p-4
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-3

                mb-6
              "
            >
              <div
                className="
                  p-3

                  rounded-xl

                  bg-red-100
                "
              >
                <ShieldAlert
                  className="text-red-600"
                  size={22}
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg

                    font-semibold

                    text-red-600
                  "
                >
                  Danger Zone
                </h2>

                <p className="text-sm text-slate-500">
                  Permanent account actions.
                </p>
              </div>
            </div>

            <DangerZone />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
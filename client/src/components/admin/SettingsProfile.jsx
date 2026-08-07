import {
  useEffect,
  useState,
} from "react";

import {
  Camera,
  Save,
  User,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getAdminProfile,
  updateAdminProfile,
  uploadAdminAvatar,
} from "../../services/adminService";

const SettingsProfile = () => {
  // ==========================================
  // State
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  // ==========================================
  // Default Avatar
  // ==========================================

  const getDefaultAvatar = (name) => {
    const avatarName =
      encodeURIComponent(
        name?.trim() || "Admin"
      );

    return `https://ui-avatars.com/api/?name=${avatarName}&background=10b981&color=fff`;
  };

  // ==========================================
  // Load Real Admin Profile
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const response =
          await getAdminProfile();

        const admin = response?.admin;

        if (!admin) {
          throw new Error(
            "Admin profile not found"
          );
        }

        const profile = {
          name: admin.name || "",
          email: admin.email || "",
          phone: admin.phone || "",
          avatar: admin.avatar || "",
        };

        setFormData(profile);

        setPreview(
          admin.avatar ||
            getDefaultAvatar(admin.name)
        );
      } catch (error) {
        console.error(
          "Load Admin Profile Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load admin profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Avatar Upload
  // ==========================================

  const handleImage = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // ========================================
    // Validate Image
    // ========================================

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image"
      );

      e.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "Image size must be less than 5MB"
      );

      e.target.value = "";
      return;
    }

    // Temporary preview

    const localPreview =
      URL.createObjectURL(file);

    setPreview(localPreview);

    try {
      setUploading(true);

      const response =
        await uploadAdminAvatar(file);

      const avatar =
        response?.avatar;

      if (!avatar) {
        throw new Error(
          "Avatar URL not returned"
        );
      }

      setFormData((prev) => ({
        ...prev,
        avatar,
      }));

      setPreview(avatar);

      toast.success(
        response?.message ||
          "Avatar updated successfully"
      );
    } catch (error) {
      console.error(
        "Avatar Upload Error:",
        error
      );

      // Restore old image if upload fails

      setPreview(
        formData.avatar ||
          getDefaultAvatar(
            formData.name
          )
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to upload avatar"
      );
    } finally {
      URL.revokeObjectURL(
        localPreview
      );

      setUploading(false);

      e.target.value = "";
    }
  };

  // ==========================================
  // Update Profile
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name =
      formData.name.trim();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const phone =
      formData.phone.trim();

    // ========================================
    // Validation
    // ========================================

    if (!name) {
      toast.error(
        "Full name is required"
      );
      return;
    }

    if (!email) {
      toast.error(
        "Email is required"
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.error(
        "Please enter a valid email address"
      );
      return;
    }

    try {
      setSaving(true);

      // ======================================
      // Real Backend Update
      // ======================================

      const response =
        await updateAdminProfile({
          name,
          email,
          phone,
        });

      const updatedAdmin =
        response?.admin;

      if (!updatedAdmin) {
        throw new Error(
          "Updated admin data not returned"
        );
      }

      // ======================================
      // Update UI With MongoDB Response
      // ======================================

      setFormData({
        name:
          updatedAdmin.name || "",
        email:
          updatedAdmin.email || "",
        phone:
          updatedAdmin.phone || "",
        avatar:
          updatedAdmin.avatar || "",
      });

      setPreview(
        updatedAdmin.avatar ||
          getDefaultAvatar(
            updatedAdmin.name
          )
      );

      toast.success(
        response?.message ||
          "Profile updated successfully"
      );
    } catch (error) {
      console.error(
        "Update Admin Profile Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          min-h-[300px]

          flex
          flex-col
          items-center
          justify-center

          gap-3

          text-slate-500
        "
      >
        <Loader2
          size={30}
          className="animate-spin text-emerald-600"
        />

        <p className="text-sm">
          Loading profile...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* ====================================== */}
      {/* Avatar */}
      {/* ====================================== */}

      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={
              preview ||
              getDefaultAvatar(
                formData.name
              )
            }
            alt="Admin avatar"
            className="
              w-28
              h-28

              sm:w-32
              sm:h-32

              lg:w-36
              lg:h-36

              rounded-full
              object-cover

              border-4
              border-emerald-500

              shadow-lg
            "
          />

          <label
            htmlFor="admin-avatar"
            className={`
              absolute
              bottom-1
              right-1

              p-3

              rounded-full

              text-white

              transition

              ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              }
            `}
          >
            {uploading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Camera size={18} />
            )}
          </label>

          <input
            type="file"
            id="admin-avatar"
            hidden
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImage}
            disabled={uploading}
          />
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {uploading
            ? "Uploading image..."
            : "JPG, PNG or WEBP up to 5MB"}
        </p>
      </div>

      {/* ====================================== */}
      {/* Inputs */}
      {/* ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >
        {/* ==================================== */}
        {/* Name */}
        {/* ==================================== */}

        <div>
          <label
            htmlFor="admin-name"
            className="
              text-sm
              font-medium
              text-slate-600
            "
          >
            Full Name
          </label>

          <div
            className="
              mt-2

              flex
              items-center

              border
              border-slate-300

              rounded-xl

              px-4

              bg-white

              focus-within:border-emerald-500
              focus-within:ring-1
              focus-within:ring-emerald-500

              transition
            "
          >
            <User
              size={18}
              className="text-slate-400 shrink-0"
            />

            <input
              id="admin-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="
                w-full

                px-3
                py-3

                bg-transparent

                outline-none

                text-slate-700
              "
            />
          </div>
        </div>

        {/* ==================================== */}
        {/* Email */}
        {/* ==================================== */}

        <div>
          <label
            htmlFor="admin-email"
            className="
              text-sm
              font-medium
              text-slate-600
            "
          >
            Email
          </label>

          <div
            className="
              mt-2

              flex
              items-center

              border
              border-slate-300

              rounded-xl

              px-4

              bg-white

              focus-within:border-emerald-500
              focus-within:ring-1
              focus-within:ring-emerald-500

              transition
            "
          >
            <Mail
              size={18}
              className="text-slate-400 shrink-0"
            />

            <input
              id="admin-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="
                w-full

                px-3
                py-3

                bg-transparent

                outline-none

                text-slate-700
              "
            />
          </div>
        </div>

        {/* ==================================== */}
        {/* Phone */}
        {/* ==================================== */}

        <div className="md:col-span-2">
          <label
            htmlFor="admin-phone"
            className="
              text-sm
              font-medium
              text-slate-600
            "
          >
            Phone
          </label>

          <div
            className="
              mt-2

              flex
              items-center

              border
              border-slate-300

              rounded-xl

              px-4

              bg-white

              focus-within:border-emerald-500
              focus-within:ring-1
              focus-within:ring-emerald-500

              transition
            "
          >
            <Phone
              size={18}
              className="text-slate-400 shrink-0"
            />

            <input
              id="admin-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="
                w-full

                px-3
                py-3

                bg-transparent

                outline-none

                text-slate-700
              "
            />
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* Save */}
      {/* ====================================== */}

      <div
        className="
          flex
          justify-end
        "
      >
        <button
          type="submit"
          disabled={
            saving || uploading
          }
          className="
            w-full
            sm:w-auto

            min-h-12

            flex
            items-center
            justify-center
            gap-2

            bg-emerald-600
            hover:bg-emerald-700

            text-white
            font-semibold

            px-8
            py-3

            rounded-xl

            transition

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {saving ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default SettingsProfile;
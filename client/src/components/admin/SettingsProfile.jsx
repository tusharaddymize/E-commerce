import { useState } from "react";
import {
  Camera,
  Save,
  User,
  Mail,
  Phone,
  AtSign,
  FileText,
} from "lucide-react";

const SettingsProfile = () => {
  const [formData, setFormData] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "",
    username: "admin",
    bio: "",
    avatar:
      "https://ui-avatars.com/api/?name=Admin&background=10b981&color=fff",
  });

  const [preview, setPreview] = useState(formData.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Profile updated successfully.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Avatar */}

      <div className="flex flex-col items-center">

        <div className="relative">

          <img
            src={preview}
            alt="avatar"
            className="w-36 h-36 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
          />

          <label
            htmlFor="avatar"
            className="absolute bottom-1 right-1 bg-emerald-600 hover:bg-emerald-700 cursor-pointer p-3 rounded-full transition"
          >
            <Camera
              className="text-white"
              size={18}
            />
          </label>

          <input
            type="file"
            id="avatar"
            hidden
            accept="image/*"
            onChange={handleImage}
          />

        </div>

        <p className="mt-3 text-sm text-slate-500">
          JPG, PNG up to 5MB
        </p>

      </div>

      {/* Inputs */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}

        <div>

          <label className="text-sm font-medium text-slate-600">
            Full Name
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4">

            <User
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-3 outline-none"
              placeholder="Full Name"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="text-sm font-medium text-slate-600">
            Email
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4">

            <Mail
              size={18}
              className="text-slate-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-3 outline-none"
            />

          </div>

        </div>

        {/* Phone */}

        <div>

          <label className="text-sm font-medium text-slate-600">
            Phone
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4">

            <Phone
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-3 outline-none"
              placeholder="+91 9876543210"
            />

          </div>

        </div>

        {/* Username */}

        <div>

          <label className="text-sm font-medium text-slate-600">
            Username
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4">

            <AtSign
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-3 outline-none"
            />

          </div>

        </div>

      </div>

      {/* Bio */}

      <div>

        <label className="text-sm font-medium text-slate-600">
          Bio
        </label>

        <div className="mt-2 flex border rounded-xl px-4">

          <FileText
            size={18}
            className="text-slate-400 mt-4"
          />

          <textarea
            rows={5}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-3 outline-none resize-none"
            placeholder="Write something about yourself..."
          />

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition"
        >
          <Save size={18} />

          Save Changes
        </button>

      </div>

    </form>
  );
};

export default SettingsProfile;
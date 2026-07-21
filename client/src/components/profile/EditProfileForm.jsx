import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";
import { updateProfile, uploadAvatar,} from "../../services/userService";

import AvatarUpload from "./AvatarUpload";

const schema = z.object({
  name: z.string().min(2, "Minimum 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
});

const EditProfileForm = () => {
  const navigate = useNavigate();

 const { user, setUser } = useAuth();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

const onSubmit = async (values) => {
  try {
    setLoading(true);

    // Update Name & Phone
const profileResponse = await updateProfile(values);

if (profileResponse.user) {
  setUser(profileResponse.user);

  localStorage.setItem(
    "user",
    JSON.stringify(profileResponse.user)
  );
}

    // Upload Avatar (if selected)
if (image) {
  const avatarResponse = await uploadAvatar(image);

  if (avatarResponse.user) {
    setUser(avatarResponse.user);

    localStorage.setItem(
      "user",
      JSON.stringify(avatarResponse.user)
    );
  }
}

    alert("Profile Updated Successfully");

    navigate("/profile");
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Update Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">

      <AvatarUpload
        image={user?.avatar}
        setImage={setImage}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <div>

          <label className="font-medium">
            Full Name
          </label>

          <input
            {...register("name")}
            className="w-full border rounded-lg p-3 mt-2"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.name?.message}
          </p>

        </div>

        <div>

          <label className="font-medium">
            Phone Number
          </label>

          <input
            {...register("phone")}
            className="w-full border rounded-lg p-3 mt-2"
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.phone?.message}
          </p>

        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : "Save Changes"}
        </button>

      </form>

    </div>
  );
};

export default EditProfileForm;
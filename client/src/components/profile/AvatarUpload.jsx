import { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";

const AvatarUpload = ({ image, setImage }) => {
  const [preview, setPreview] = useState(image || "");

  // ==========================================
  // Update Preview when Image Changes
  // ==========================================

  useEffect(() => {
    if (typeof image === "string") {
      setPreview(image);
    }
  }, [image]);

  // ==========================================
  // Handle Image Change
  // ==========================================

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        {/* ======================================
            Avatar
        ====================================== */}

        <img
          src={
            preview ||
            "https://ui-avatars.com/api/?name=User&background=355E3B&color=fff"
          }
          alt="Avatar"
          className="
            w-32
            h-32
            sm:w-36
            sm:h-36
            rounded-full
            object-cover
            border-4
          "
          style={{
            borderColor:
              "var(--primary-color, #355E3B)",
          }}
        />

        {/* ======================================
            Upload Button
        ====================================== */}

        <label
          className="
            absolute
            bottom-2
            right-2

            w-10
            h-10

            flex
            items-center
            justify-center

            text-white
            cursor-pointer

            shadow-lg

            transition-all
            duration-300

            hover:opacity-90
            hover:scale-105
          "
          style={{
            backgroundColor:
              "var(--primary-color, #355E3B)",

            borderRadius: "50%",
          }}
        >
          <FiCamera size={18} />

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default AvatarUpload;
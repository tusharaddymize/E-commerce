import { useState } from "react";
import { FiCamera } from "react-icons/fi";

const AvatarUpload = ({ image, setImage }) => {
  const [preview, setPreview] = useState(image || "");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">

        <img
          src={
            preview ||
            "https://ui-avatars.com/api/?name=User&background=16a34a&color=fff"
          }
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
        />

        <label className="absolute bottom-2 right-2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700">
          <FiCamera />

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
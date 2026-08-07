import { useRef, useState } from "react";
import {
  Camera,
  Trash2,
  Upload,
} from "lucide-react";

const UploadAvatar = ({
  image,
  onImageChange,
}) => {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(image || "");

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleFile(file);
  };

  const handleRemove = () => {
    setPreview("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center">

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative"
      >
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg bg-slate-100">

          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">

              <Camera
                size={45}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-500 mt-2">
                No Image
              </span>

            </div>
          )}

        </div>

        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="absolute bottom-2 right-2 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-full transition"
        >
          <Upload
            className="text-white"
            size={18}
          />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleInput}
      />

      <p className="mt-4 text-sm text-slate-500">
        Drag & Drop or Upload Image
      </p>

      <p className="text-xs text-slate-400">
        JPG, PNG (Max 5 MB)
      </p>

      <div className="flex gap-3 mt-5">

        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          Upload
        </button>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
          >
            <Trash2 size={16} />

            Remove
          </button>
        )}

      </div>

    </div>
  );
};

export default UploadAvatar;
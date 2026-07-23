import {
  FiImage,
  FiCheckCircle,
} from "react-icons/fi";

const ImageGuidelines = ({
  title = "Image Upload",
  recommended = "",
  minimum = "",
  ratio = "",
  format = "",
  maxSize = "",
  note = "",
}) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

      <div className="flex items-center gap-3 mb-4">

        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
          <FiImage className="text-green-700 text-xl" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            {title}
          </h3>

          <p className="text-xs text-gray-500">
            Recommended image specifications
          </p>
        </div>

      </div>

      <div className="space-y-3 text-sm">

        {recommended && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Recommended Size
            </span>

            <span className="font-semibold text-gray-800">
              {recommended}
            </span>
          </div>
        )}

        {minimum && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Minimum Size
            </span>

            <span className="font-semibold text-gray-800">
              {minimum}
            </span>
          </div>
        )}

        {ratio && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Aspect Ratio
            </span>

            <span className="font-semibold text-gray-800">
              {ratio}
            </span>
          </div>
        )}

        {format && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Formats
            </span>

            <span className="font-semibold text-gray-800">
              {format}
            </span>
          </div>
        )}

        {maxSize && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Max File Size
            </span>

            <span className="font-semibold text-gray-800">
              {maxSize}
            </span>
          </div>
        )}

      </div>

      {note && (
        <div className="mt-5 flex items-start gap-2 text-green-700 text-sm">

          <FiCheckCircle className="mt-0.5" />

          <p>{note}</p>

        </div>
      )}

    </div>
  );
};

export default ImageGuidelines;
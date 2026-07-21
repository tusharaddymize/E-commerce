import { FaExclamationTriangle } from "react-icons/fa";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load your data.",
  onRetry,
}) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl border shadow-lg p-10 max-w-lg w-full text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <FaExclamationTriangle className="text-red-500 text-5xl" />
        </div>

        <h2 className="text-3xl font-bold mt-6">
          {title}
        </h2>

        <p className="text-gray-500 mt-4">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-8 w-full h-14 rounded-2xl bg-[#355E3B] text-white font-semibold hover:bg-[#27452d] transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
const SkeletonCard = () => {

  return (

    <div
      className="
      animate-pulse
      bg-white
      rounded-2xl
      shadow
      overflow-hidden
      "
    >

      <div className="h-80 bg-gray-200"></div>

      <div className="p-5">

        <div className="h-5 bg-gray-200 rounded mb-3"></div>

        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>

        <div className="h-6 bg-gray-200 rounded w-1/3"></div>

      </div>

    </div>

  );

};

export default SkeletonCard;
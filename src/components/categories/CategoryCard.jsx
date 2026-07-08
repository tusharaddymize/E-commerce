const CategoryCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <button
      className="
        flex
        flex-col
        items-center
        gap-3
        group
        shrink-0
      "
    >
      <div
        className="
          w-20
          h-20
          rounded-full
          bg-[#f6f8f5]
          border
          border-gray-200
          flex
          items-center
          justify-center
          text-[#355E3B]
          text-3xl
          transition-all
          duration-300
          group-hover:bg-[#355E3B]
          group-hover:text-white
          group-hover:scale-110
          shadow-sm
        "
      >
        <Icon />
      </div>

      <span className="text-sm font-medium text-gray-700">
        {item.name}
      </span>
    </button>
  );
};

export default CategoryCard;
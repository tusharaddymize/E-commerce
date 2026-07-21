import { categories } from "./categoryData";

<div className="mt-12 mb-12">
  <div className="flex justify-between items-center overflow-x-auto px-6 py-2">
    {categories.map((item) => (
      <div
        key={item.id}
        className="flex flex-col items-center min-w-[75px]"
      >
        <div
          className="
            w-14
            h-14
            rounded-full
            border
            bg-white
            flex
            items-center
            justify-center
            shadow-sm
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-lg
          "
        >
          <item.icon className="text-xl text-green-700" />
        </div>

        <p className="mt-2 text-xs font-medium text-gray-700 text-center">
          {item.name}
        </p>
      </div>
    ))}
  </div>
</div>
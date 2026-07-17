const ProductTableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {["Image", "Product", "Category", "Price", "Stock", "Status", "Actions"].map(
              (item) => (
                <th key={item} className="px-4 py-3 text-left">
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {[...Array(6)].map((_, index) => (
            <tr key={index} className="border-t animate-pulse">
              <td className="px-4 py-3">
                <div className="h-16 w-16 rounded-lg bg-gray-200"></div>
              </td>

              <td className="px-4 py-3">
                <div className="mb-2 h-4 w-40 rounded bg-gray-200"></div>
                <div className="h-3 w-24 rounded bg-gray-200"></div>
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-20 rounded bg-gray-200"></div>
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-16 rounded bg-gray-200"></div>
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-10 rounded bg-gray-200"></div>
              </td>

              <td className="px-4 py-3">
                <div className="h-7 w-20 rounded-full bg-gray-200"></div>
              </td>

              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center">
                  <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
                  <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableSkeleton;
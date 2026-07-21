import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const InventoryTable = ({ products = [] }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      );
    });
  }, [products, search]);

  const getStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out Of Stock",
        className: "bg-red-100 text-red-700",
      };
    }

    if (stock <= 10) {
      return {
        label: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "In Stock",
      className: "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h2 className="text-xl font-semibold">
          Inventory Products
        </h2>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-3">
                Product
              </th>

              <th className="text-left p-3">
                Category
              </th>

              <th className="text-left p-3">
                Price
              </th>

              <th className="text-left p-3">
                Stock
              </th>

              <th className="text-left p-3">
                Sold
              </th>

              <th className="text-left p-3">
                Inventory Value
              </th>

              <th className="text-left p-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const status = getStatus(
                  product.stock
                );

                return (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* Product */}

                    <td className="p-3">

                      <div className="flex items-center gap-3">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />

                        <div>

                          <h3 className="font-medium">
                            {product.name}
                          </h3>

                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="p-3">
                      {product.category}
                    </td>

                    {/* Price */}

                    <td className="p-3">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>

                    {/* Stock */}

                    <td className="p-3 font-semibold">
                      {product.stock}
                    </td>

                    {/* Sold */}

                    <td className="p-3">
                      {product.sold}
                    </td>

                    {/* Inventory Value */}

                    <td className="p-3 font-semibold text-green-600">
                      ₹
                      {product.inventoryValue.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    {/* Status */}

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>

                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>

                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No products found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default InventoryTable;
import { Trophy } from "lucide-react";

const TopSellingProducts = ({ products = [] }) => {
  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Top Selling Products
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Best performing products by sales.
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No sales data available.
        </div>
      ) : (
        <div className="space-y-5">
          {products.map((product, index) => (
            <div
              key={product._id || index}
              className="flex flex-col md:flex-row md:items-center gap-5 border-b border-slate-100 pb-5"
            >
              {/* Product Image */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    product.image ||
                    "https://placehold.co/80x80?text=Product"
                  }
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border"
                />

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    Sold: <strong>{product.sold}</strong>
                  </span>

                  <span className="font-semibold text-green-600">
                    ₹
                    {Number(
                      product.revenue
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Progress */}
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-600 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        product.progress || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSellingProducts;
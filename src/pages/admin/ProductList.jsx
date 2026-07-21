import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import ProductSearch from "../../components/admin/ProductSearch";
import ProductPagination from "../../components/admin/ProductPagination";
import ProductTableSkeleton from "../../components/admin/ProductTableSkeleton";
import DeleteConfirmationModal from "../../components/admin/DeleteConfirmationModal";

import {
  getAdminProducts,
  deleteProduct,
} from "../../services/productService";

const ProductList = () => {
  const navigate = useNavigate();

  // ==========================
  // Sidebar
  // ==========================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================
  // States
  // ==========================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ==========================
  // Load Products
  // ==========================

  // const loadProducts = useCallback(async () => {
  //   try {
  //     setLoading(true);

  //     const data = await getAdminProducts({
  //       page,
  //       limit,
  //       search,
  //     });

  //     setProducts(data.products || []);
  //     setTotalPages(data.totalPages || 1);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page, limit, search]);
  
  const loadProducts = useCallback(async () => {
  try {
    setLoading(true);

    console.log("Current Page:", page);

    const data = await getAdminProducts({
      page,
      limit,
      search,
    });

    console.log("API Response:", data);

    setProducts(data.products || []);
    setTotalPages(data.totalPages || 1);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, [page, limit, search]);


  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ==========================
  // Search
  // ==========================

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // ==========================
  // Delete
  // ==========================

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteProduct(deleteId);

      toast.success("Product deleted successfully.");

      setDeleteId(null);

      loadProducts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete product.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ==========================
  // Edit
  // ==========================

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  // ==========================
  // Add Product
  // ==========================

  const handleAddProduct = () => {
    navigate("/admin/add-product");
  };

  return (
    <div className="min-h-screen bg-slate-100">
  <div className="flex">

    {/* Sidebar */}
    <AdminSidebar
      isOpen={sidebarOpen}
      setIsOpen={setSidebarOpen}
    />

    {/* Main Content */}
    <div className="flex-1 min-w-0 flex flex-col">

      {/* Navbar */}
      <AdminNavbar
        setSidebarOpen={setSidebarOpen}
      />

      {/* Page */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Product List
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage all your products from one place.
            </p>
          </div>

          <button
            onClick={handleAddProduct}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
          >
            <Plus size={20} />
            Add Product
          </button>

        </div>

        {/* Search */}
        <div className="mb-6">
          <ProductSearch
            value={search}
            onSearch={handleSearch}
          />
        </div>

        {/* Products */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {loading ? (
            <ProductTableSkeleton />
          ) : products.length === 0 ? (

            <div className="py-20 text-center text-gray-500">
              No Products Found
            </div>

          ) : (

            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-gray-100">

                    <tr>

                      <th className="px-5 py-4 text-left font-semibold">
                        Image
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Product
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Category
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Stock
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Status
                      </th>

                      <th className="px-5 py-4 text-center font-semibold">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {products.map((product) => (

                      <tr
                        key={product._id}
                        className="border-t hover:bg-gray-50 transition"
                      >

                        <td className="px-5 py-4">

                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-16 w-16 rounded-xl object-cover"
                          />

                        </td>

                        <td className="px-5 py-4">

                          <h3 className="font-semibold">
                            {product.title}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {product.brand}
                          </p>

                        </td>

                        <td className="px-5 py-4">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          ₹{product.price}
                        </td>

                        <td className="px-5 py-4">
                          {product.stock}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              product.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.status}
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() =>
                                handleEdit(product._id)
                              }
                              className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(product._id)
                              }
                              className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                            >
                              <Trash2 size={18} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden divide-y">
                                {products.map((product) => (
                  <div
                    key={product._id}
                    className="p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex gap-4">

                      {/* Product Image */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-24 w-24 rounded-xl object-cover border"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-gray-800 line-clamp-2">
                          {product.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.brand}
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">

                          <div>
                            <span className="text-gray-500">
                              Category
                            </span>

                            <p className="font-medium">
                              {product.category}
                            </p>
                          </div>

                          <div>
                            <span className="text-gray-500">
                              Price
                            </span>

                            <p className="font-semibold text-green-600">
                              ₹{product.price}
                            </p>
                          </div>

                          <div>
                            <span className="text-gray-500">
                              Stock
                            </span>

                            <p>{product.stock}</p>
                          </div>

                          <div>
                            <span className="text-gray-500">
                              Status
                            </span>

                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                product.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {product.status}
                            </span>
                          </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-3">

                          <button
                            onClick={() =>
                              handleEdit(product._id)
                            }
                            className="flex-1 rounded-xl bg-blue-500 py-2 text-white hover:bg-blue-600 transition"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Pencil size={18} />
                              Edit
                            </div>
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="flex-1 rounded-xl bg-red-500 py-2 text-white hover:bg-red-600 transition"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Trash2 size={18} />
                              Delete
                            </div>
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* Pagination */}
              <div className="border-t p-4 sm:p-6">

<ProductPagination
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>

              </div>

            </>
          )}

        </div>

      </main>

    </div>

  </div>

  <DeleteConfirmationModal
    open={!!deleteId}
    loading={deleteLoading}
    onCancel={() => setDeleteId(null)}
    onConfirm={confirmDelete}
  />

</div>
  );
};

export default ProductList;
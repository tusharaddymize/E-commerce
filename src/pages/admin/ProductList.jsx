import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import ProductSearch from "../../components/admin/ProductSearch";
import ProductPagination from "../../components/admin/ProductPagination";
import DeleteConfirmationModal from "../../components/admin/DeleteConfirmationModal";
import {
  getAdminProducts,
  deleteProduct,
} from "../../services/productService";

import ProductTableSkeleton from "../../components/admin/ProductTableSkeleton";

const ProductList = () => {
  const navigate = useNavigate();

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

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAdminProducts({
        page,
        limit,
        search,
      });

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

  // =========================
  // Add Product
  // ==========================

  const handleAddProduct = () => {
    navigate("/admin/add-product");
  };

  return (
        <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-8">
          {/* Header */}

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Product List
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all your products here.
              </p>
            </div>

            <button
              onClick={handleAddProduct}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
            >
              <Plus size={18} />
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

          {/* Table */}

          <div className="overflow-hidden rounded-xl bg-white shadow">
           {loading ? (
  <ProductTableSkeleton />
): products.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No Products Found
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left">Image</th>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">Category</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Stock</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          </td>

                          <td className="px-4 py-3">
                            <div className="font-semibold">
                              {product.title}
                            </div>

                            <div className="text-sm text-gray-500">
                              {product.brand}
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            {product.category}
                          </td>

                          <td className="px-4 py-3 font-semibold">
                            ₹{product.price}
                          </td>

                          <td className="px-4 py-3">
                            {product.stock}
                          </td>

                          <td className="px-4 py-3">
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

                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  handleEdit(product._id)
                                }
                                className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(product._id)
                                }
                                className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t p-6">
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
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import AdminSidebar from "../../components/admin/AdminSidebar";
// import AdminNavbar from "../../components/admin/AdminNavbar";

// import { createProduct } from "../../services/productService";

// const AddProduct = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const [preview, setPreview] = useState("");

//   const [thumbnail, setThumbnail] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     brand: "",
//     category: "",
//     price: "",
//     oldPrice: "",
//     discount: "",
//     stock: "",
//     sku: "",
//     sizes: "",
//     colors: "",
//     fabric: "",
//     pattern: "",
//     occasion: "",
//     country: "India",
//     isFeatured: false,
//     isTrending: false,
//     status: "active",
//   });

//   // =============================
//   // Input Change
//   // =============================

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));
//   };

//   // =============================
//   // Image Change
//   // =============================

//   const handleImage = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     setThumbnail(file);

//     setPreview(URL.createObjectURL(file));
//   };

//   // =============================
//   // Submit
//   // =============================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       Object.keys(form).forEach((key) => {
//         formData.append(key, form[key]);
//       });

//       if (thumbnail) {
//         formData.append(
//           "thumbnail",
//           thumbnail
//         );
//       }

//       const res =
//         await createProduct(formData);

//       alert(res.message);

//       navigate("/admin/dashboard");

//     } catch (err) {

//       console.error(err);

//       alert(
//         err?.response?.data?.message ||
//           "Product creation failed."
//       );

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">

//       <AdminSidebar />

//       <div className="flex-1">

//         <AdminNavbar />

//         <main className="p-8">

//           <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">

//             <h2 className="text-3xl font-bold mb-8">

//               Add Product

//             </h2>

//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-2 gap-6"
//             >

//               <input
//                 name="title"
//                 placeholder="Product Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//                 required
//               />

//               <input
//                 name="brand"
//                 placeholder="Brand"
//                 value={form.brand}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//                 required
//               />

//               <input
//                 name="category"
//                 placeholder="Category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//                 required
//               />

//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//                 required
//               />

//               <input
//                 type="number"
//                 name="oldPrice"
//                 placeholder="Old Price"
//                 value={form.oldPrice}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 type="number"
//                 name="discount"
//                 placeholder="Discount %"
//                 value={form.discount}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 type="number"
//                 name="stock"
//                 placeholder="Stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 name="sku"
//                 placeholder="SKU"
//                 value={form.sku}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 name="sizes"
//                 placeholder="Sizes (S,M,L)"
//                 value={form.sizes}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 name="colors"
//                 placeholder="Colors (Red,Blue)"
//                 value={form.colors}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 name="fabric"
//                 placeholder="Fabric"
//                 value={form.fabric}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 name="pattern"
//                 placeholder="Pattern"
//                 value={form.pattern}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <input
//                 name="occasion"
//                 placeholder="Occasion"
//                 value={form.occasion}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3"
//               />

//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 className="border rounded-lg p-3 col-span-2"
//                 rows={5}
//                 required
//               />

//               {/* <div className="col-span-2">

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImage}
//                 />

//               </div> */}



//               <div className="col-span-2">
//   <label className="block mb-2 text-sm font-medium text-gray-700">
//     Product Image
//   </label>

//   <label
//     htmlFor="thumbnail"
//     className="flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-600 hover:bg-green-50 transition-all duration-300"
//   >
//     <div className="text-center">
//       <p className="text-lg font-semibold text-gray-700">
//         📁 Choose Product Image
//       </p>

//       <p className="text-sm text-gray-500 mt-2">
//         JPG, PNG, WEBP (Max 5MB)
//       </p>

//       {thumbnail && (
//         <p className="mt-3 text-green-600 font-medium">
//           ✅ {thumbnail.name}
//         </p>
//       )}
//     </div>

//     <input
//       id="thumbnail"
//       type="file"
//       accept="image/*"
//       className="hidden"
//       onChange={handleImage}
//     />
//   </label>
// </div>

//             {preview && (
//   <div className="col-span-2 flex justify-center">
//     <div className="border rounded-xl p-3 bg-gray-50 shadow-sm">
//       <img
//         src={preview}
//         alt="Preview"
//         className="h-56 w-56 object-cover rounded-lg"
//       />
//     </div>
//   </div>
// )}

//               <div className="flex gap-6 col-span-2">

//                 <label>

//                   <input
//                     type="checkbox"
//                     name="isFeatured"
//                     checked={form.isFeatured}
//                     onChange={handleChange}
//                   />

//                   <span className="ml-2">
//                     Featured
//                   </span>

//                 </label>

//                 <label>

//                   <input
//                     type="checkbox"
//                     name="isTrending"
//                     checked={form.isTrending}
//                     onChange={handleChange}
//                   />

//                   <span className="ml-2">
//                     Trending
//                   </span>

//                 </label>

//               </div>

//               <button
//                 disabled={loading}
//                 className="col-span-2 bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 font-semibold"
//               >

//                 {loading
//                   ? "Uploading..."
//                   : "Add Product"}

//               </button>

//             </form>

//           </div>

//         </main>

//       </div>

//     </div>
//   );
// };

// export default AddProduct;




import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { createProduct } from "../../services/productService";

const AddProduct = () => {
  const navigate = useNavigate();

  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Image Preview
  const [preview, setPreview] = useState("");

  // Image File
  const [thumbnail, setThumbnail] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    oldPrice: "",
    discount: "",
    stock: "",
    sku: "",
    sizes: "",
    colors: "",
    fabric: "",
    pattern: "",
    occasion: "",
    country: "India",
    isFeatured: false,
    isTrending: false,
    status: "active",
  });

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================
  // Handle Image Upload
  // ==========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setPreview(URL.createObjectURL(file));
  };

  // ==========================
  // Submit Product
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const res = await createProduct(formData);

      alert(res.message);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Product creation failed."
      );
    } finally {
      setLoading(false);
    }
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

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Add Product
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Fill in the product details to add a new product.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 lg:p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* Product Title */}
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Brand */}
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Old Price */}
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={form.oldPrice}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Discount */}
            <input
              type="number"
              name="discount"
              placeholder="Discount %"
              value={form.discount}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Stock */}
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* SKU */}
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={form.sku}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Sizes */}
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (S,M,L)"
              value={form.sizes}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Colors */}
            <input
              type="text"
              name="colors"
              placeholder="Colors (Red, Blue)"
              value={form.colors}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Fabric */}
            <input
              type="text"
              name="fabric"
              placeholder="Fabric"
              value={form.fabric}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Pattern */}
            <input
              type="text"
              name="pattern"
              placeholder="Pattern"
              value={form.pattern}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Occasion */}
            <input
              type="text"
              name="occasion"
              placeholder="Occasion"
              value={form.occasion}
              onChange={handleChange}
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="border rounded-xl p-3 md:col-span-2 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
                        {/* Product Image Upload */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Image
              </label>

              <label
                htmlFor="thumbnail"
                className="flex items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-green-600 hover:bg-green-50 transition-all duration-300"
              >
                <div className="text-center px-4">
                  <p className="text-lg font-semibold text-gray-700">
                    📁 Choose Product Image
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG, WEBP (Max 5MB)
                  </p>

                  {thumbnail && (
                    <p className="mt-3 text-green-600 font-medium break-all">
                      ✅ {thumbnail.name}
                    </p>
                  )}
                </div>

                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="md:col-span-2 flex justify-center">
                <div className="border border-gray-200 rounded-2xl p-3 bg-gray-50 shadow-sm">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-56 h-56 object-cover rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* Checkboxes */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">
                  Featured Product
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={form.isTrending}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">
                  Trending Product
                </span>
              </label>

            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl py-3 font-semibold transition-all duration-300"
              >
                {loading ? "Uploading..." : "Add Product"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-xl py-3 font-semibold transition-all duration-300"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  </div>
</div>
  );
};

export default AddProduct;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  getOrderById,
  updateOrderStatus,
} from "../../services/orderService";

const AdminOrderDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      setLoading(true);

      const data = await getOrderById(id);

      setOrder(data.order);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      await updateOrderStatus(
        id,
        status,
        order.paymentStatus
      );

      toast.success("Order updated");

      loadOrder();
    } catch (error) {
      console.error(error);

      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Order not found.
      </div>
    );
  }
    return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar title="Order Details" />

        <div className="p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-2 mb-6 text-green-700 hover:text-green-900"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          {/* Header */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h2>

                <p className="text-gray-500 mt-2">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Order Status
                </label>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(e.target.value)
                  }
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer + Shipping */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg mb-4">
                Customer Information
              </h3>

              <div className="space-y-2">
                <p>
                  <strong>Name:</strong>{" "}
                  {order.shippingAddress.fullName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.shippingAddress.email}
                </p>

                <p>
                  <strong>Mobile:</strong>{" "}
                  {order.shippingAddress.mobile}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg mb-4">
                Shipping Address
              </h3>

              <div className="space-y-2">
                <p>{order.shippingAddress.address}</p>

                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                </p>

                <p>
                  {order.shippingAddress.country} -{" "}
                  {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl shadow overflow-x-auto mb-6">
            <table className="min-w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-center">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-center">
                    Price
                  </th>
                  <th className="px-4 py-3 text-center">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover"
                        />

                        <div>
                          <div className="font-semibold">
                            {item.title}
                          </div>

                          {item.selectedColor && (
                            <div className="text-sm text-gray-500">
                              Color: {item.selectedColor}
                            </div>
                          )}

                          {item.selectedSize && (
                            <div className="text-sm text-gray-500">
                              Size: {item.selectedSize}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      {item.quantity}
                    </td>

                    <td className="text-center">
                      ₹{item.price}
                    </td>

                    <td className="text-center font-semibold">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg mb-4">
              Payment Summary
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Payment Method</span>

                <span>{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Status</span>

                <span>{order.paymentStatus}</span>
              </div>

              <hr />

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>₹{order.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>₹{order.shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>GST</span>

                <span>₹{order.gst}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>

                <span>- ₹{order.discount}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold text-green-700">
                <span>Total</span>

                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
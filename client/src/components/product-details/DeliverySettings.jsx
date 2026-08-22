import { useState } from "react";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const DeliverySettings = ({ product }) => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ==========================================
  // Pincode Change
  // ==========================================

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setPincode(value);
    setResult(null);
  };

  // ==========================================
  // Check Delivery
  // ==========================================

  const checkDelivery = async () => {
    // Validate pincode
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    // Product required
    if (!product?._id) {
      toast.error("Product information is missing.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(
        `${API_URL}/delivery/check`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productId: product._id,
            pincode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to check delivery."
        );
      }

      setResult(data);

      if (data.available) {
        toast.success(
          "Delivery is available for this pincode."
        );
      } else {
        toast.error(
          "Delivery is not available for this pincode."
        );
      }
    } catch (error) {
      console.error(
        "Delivery Check Error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to check delivery."
      );

      setResult({
        available: false,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Return
  // ==========================================

  return {
    pincode,
    loading,
    result,
    handlePincodeChange,
    checkDelivery,
  };
};

export default DeliverySettings;
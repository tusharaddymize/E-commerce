import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Current Order
  const [currentOrder, setCurrentOrder] = useState(null);

  // All Orders
  const [orders, setOrders] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Error State
  const [error, setError] = useState("");

  // Add New Order
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setCurrentOrder(order);
  };

  // Replace All Orders
  const setAllOrders = (data) => {
    setOrders(data);
  };

  // Clear Current Order
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        orders,
        loading,
        error,

        setLoading,
        setError,

        addOrder,
        setAllOrders,
        clearCurrentOrder,
        setCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
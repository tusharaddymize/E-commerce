// src/utils/toast.js

import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "12px",
  background: "#ffffff",
  color: "#1f2937",
  padding: "14px 16px",
  fontSize: window.innerWidth < 640 ? "14px" : "15px",
  fontWeight: "500",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  maxWidth: "420px",
};

export const successToast = (message) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      borderLeft: "5px solid #22c55e",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#fff",
    },
  });

export const errorToast = (message) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      borderLeft: "5px solid #ef4444",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });

export const warningToast = (message) =>
  toast(message, {
    icon: "⚠️",
    style: {
      ...baseStyle,
      borderLeft: "5px solid #f59e0b",
    },
  });

export const infoToast = (message) =>
  toast(message, {
    icon: "ℹ️",
    style: {
      ...baseStyle,
      borderLeft: "5px solid #3b82f6",
    },
  });

export const loadingToast = (message) => toast.loading(message);

export const dismissToast = (id) => toast.dismiss(id);
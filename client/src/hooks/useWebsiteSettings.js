import { useQuery } from "@tanstack/react-query";

import {
  getWebsiteSettings,
} from "../services/websiteSettingService";

// ==========================================
// Query Key
// ==========================================

export const WEBSITE_SETTINGS_QUERY_KEY = [
  "website-settings",
];

// ==========================================
// Fetch Website Settings
// ==========================================

const fetchWebsiteSettings = async () => {
  const response =
    await getWebsiteSettings();

  return response;
};

// ==========================================
// Website Settings Query
// ==========================================

const useWebsiteSettings = () => {
  return useQuery({
    // ========================================
    // Same key = same cache
    // ========================================

    queryKey:
      WEBSITE_SETTINGS_QUERY_KEY,

    // ========================================
    // API Function
    // ========================================

    queryFn:
      fetchWebsiteSettings,

    // ========================================
    // Data 10 minutes tak fresh rahega
    //
    // Is period me multiple components
    // same API ko dobara call nahi karenge.
    // ========================================

    staleTime:
      10 * 60 * 1000,

    // ========================================
    // Cache 30 minutes tak available rahega
    // ========================================

    gcTime:
      30 * 60 * 1000,

    // ========================================
    // Component mount hone par agar data
    // fresh hai to request nahi jayegi.
    // ========================================

    refetchOnMount: false,

    // ========================================
    // Browser tab/window focus par
    // request nahi jayegi.
    // ========================================

    refetchOnWindowFocus: false,

    // ========================================
    // Internet reconnect par unnecessary
    // refetch avoid karo.
    // ========================================

    refetchOnReconnect: false,

    // ========================================
    // API failure par sirf 1 retry
    // ========================================

    retry: 1,

    // ========================================
    // Background refetch ko unnecessarily
    // aggressive mat rakho.
    // ========================================

    retryDelay: 1000,
  });
};

export default useWebsiteSettings;
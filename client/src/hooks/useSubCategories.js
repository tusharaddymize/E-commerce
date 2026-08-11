import { useQuery } from "@tanstack/react-query";

import {
  getWebsiteSettings,
} from "../services/websiteSettingService";

const useWebsiteSettings = () => {
  return useQuery({
    queryKey: ["website-settings"],

    queryFn: getWebsiteSettings,

    // 10 minutes tak data fresh maana jayega
    staleTime: 10 * 60 * 1000,

    // Cache 30 minutes tak rahega
    gcTime: 30 * 60 * 1000,

    // Tab change karne par API dobara mat call karo
    refetchOnWindowFocus: false,

    // Component remount hone par bhi unnecessary refetch nahi
    refetchOnMount: false,

    // Network reconnect par bhi unnecessary request nahi
    refetchOnReconnect: false,
  });
};

export default useWebsiteSettings;
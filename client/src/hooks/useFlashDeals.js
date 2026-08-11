import { useQuery } from "@tanstack/react-query";

import {
  getFlashDeals,
} from "../services/flashDealService";

const useFlashDeals = () => {
  return useQuery({
    queryKey: ["flash-deals"],

    queryFn: getFlashDeals,

    staleTime: 2 * 60 * 1000,

    gcTime: 15 * 60 * 1000,

    refetchOnWindowFocus: false,
  });
};

export default useFlashDeals;
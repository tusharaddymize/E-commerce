import { useQuery } from "@tanstack/react-query";

import {
  getCategories,
} from "../services/categoryService";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],

    queryFn: getCategories,

    staleTime: 10 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
  });
};

export default useCategories;
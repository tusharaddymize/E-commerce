import { useQuery } from "@tanstack/react-query";

import {
  getMenuGroups,
} from "../services/menuGroupService";

const useMenuGroups = () => {
  return useQuery({
    queryKey: ["menu-groups"],

    queryFn: getMenuGroups,

    staleTime: 10 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
  });
};

export default useMenuGroups;
import { useQuery } from "@tanstack/react-query";
import { fetchDeputiesByLegislature } from "../services/fetchDeputiesByLegislature";

export const useDeputiesByLegislatureQuery = (lid?: string) => {
  const enabled = Boolean(lid);

  return useQuery(
    ["deputies", lid],
    () => {
      if (!lid) return;

      return fetchDeputiesByLegislature(lid);
    },
    {
      enabled,
    }
  );
};

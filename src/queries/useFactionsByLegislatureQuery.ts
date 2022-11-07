import { useQuery } from "@tanstack/react-query";
import { fetchFactionsByLegislature } from "../services";

export const useFactionsByLegislatureQuery = (lid?: string) => {
  const enabled = Boolean(lid);

  return useQuery(
    ["factions", lid],
    () => {
      if (!lid) return;

      return fetchFactionsByLegislature(lid);
    },
    {
      enabled,
    }
  );
};

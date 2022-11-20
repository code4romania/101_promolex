import { useQuery } from "@tanstack/react-query";
import { fetchLegislationInitiativesByDeputy } from "../services";

export const useLegislationInitiativesByDeputyQuery = (did?: string) => {
  const enabled = Boolean(did);

  return useQuery(
    ["legislation-initiatives", did],
    () => {
      if (!did) return;

      return fetchLegislationInitiativesByDeputy(did);
    },
    {
      enabled,
    }
  );
};

import { useQuery } from "@tanstack/react-query";
import { fetchRegisteredProjects } from "../services";

export const useRegisteredProjectsQuery = (
  lid?: string,
  from?: string,
  to?: string
) => {
  const enabled = Boolean(lid) && Boolean(from) && Boolean(to);

  return useQuery(
    ["registered-projects", lid, from, to],
    () => {
      if (!lid || !from || !to) return;

      return fetchRegisteredProjects(lid, from, to);
    },
    {
      enabled,
    }
  );
};

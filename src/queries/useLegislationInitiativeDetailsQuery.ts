import { useQuery } from '@tanstack/react-query';
import { fetchLegislationInitiativeDetails } from '../services';

export const useLegislationInitiativeDetailsQuery = (docid?: string) => {
  const enabled = Boolean(docid);

  return useQuery(
    ['legislation-initiative-details', docid],
    () => {
      if (!docid) return undefined;

      return fetchLegislationInitiativeDetails(docid);
    },
    {
      enabled,
    },
  );
};

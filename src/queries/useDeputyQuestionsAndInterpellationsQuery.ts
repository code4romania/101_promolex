import { useQuery } from '@tanstack/react-query';
import { fetchDeputyQuestionsAndInterpellations } from '../services';

export const useDeputyQuestionsAndInterpellations = (did?: string) => {
  const enabled = Boolean(did);

  return useQuery(
    ['deputy-questions', did],
    () => {
      if (!did) return undefined;

      return fetchDeputyQuestionsAndInterpellations(did);
    },
    {
      enabled,
    },
  );
};

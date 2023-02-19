import {
  useCurrentLegislatureQuery,
  useDeputiesByLegislatureQuery,
} from '../queries';
import { DeputiesList } from './DeputiesList';

export function DeputiesByLegislature() {
  const {
    data: lid,
    isLoading: isLoadingLid,
    isError: isErrorLoadingLid,
  } = useCurrentLegislatureQuery();

  const {
    data: deputies,
    isLoading: isLoadingDeputies,
    isError: isErrorLoadingDeputies,
  } = useDeputiesByLegislatureQuery(lid);

  const isError = isErrorLoadingLid || isErrorLoadingDeputies;
  const isLoading = isLoadingLid || isLoadingDeputies;

  return (
    <DeputiesList deputies={deputies} isError={isError} isLoading={isLoading} />
  );
}

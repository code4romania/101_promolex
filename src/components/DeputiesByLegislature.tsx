import { useDeputiesByLegislatureQuery } from '../queries';
import { DeputiesList } from './DeputiesList';

export function DeputiesByLegislature() {
  const {
    data: deputies,
    isLoading,
    isError,
  } = useDeputiesByLegislatureQuery();

  return (
    <DeputiesList deputies={deputies} isError={isError} isLoading={isLoading} />
  );
}

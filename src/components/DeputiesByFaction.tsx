import { useParams } from 'react-router-dom';
import { useDeputiesByFactionQuery } from '../queries';
import { RoutesParams } from '../types';
import { DeputiesList } from './DeputiesList';

export function DeputiesByFaction() {
  const { fid } = useParams<RoutesParams>();

  const { data, isLoading, isError } = useDeputiesByFactionQuery(fid);

  return (
    <DeputiesList deputies={data} isError={isError} isLoading={isLoading} />
  );
}

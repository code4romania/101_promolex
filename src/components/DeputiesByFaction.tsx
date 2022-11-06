import { useParams } from "react-router-dom";
import { useDeputiesByFactionQuery } from "../queries";
import { DeputiesParams } from "../types";
import { DeputiesList } from "./DeputiesList";

export const DeputiesByFaction = () => {
  const { fid } = useParams<DeputiesParams>();

  const { data, isLoading, isError } = useDeputiesByFactionQuery(fid);

  return (
    <DeputiesList deputies={data} isError={isError} isLoading={isLoading} />
  );
};

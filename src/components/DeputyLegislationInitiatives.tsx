import { useLegislationInitiativesByDeputyQuery } from "../queries";
import { legislationInitiativesTableColumns } from "../utils";
import { Table } from "./Table";

type DeputyLegislationInitiativesProps = {
  did: string;
};

export const DeputyLegislationInitiatives = ({
  did,
}: DeputyLegislationInitiativesProps) => {
  const { data } = useLegislationInitiativesByDeputyQuery(did);
  console.log(data);

  return (
    <Table
      columns={legislationInitiativesTableColumns}
      getRowId={(row) => row.docid}
      height={510}
      pageSize={5}
      rows={data ?? []}
    />
  );
};

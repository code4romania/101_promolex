import FindInPageIcon from "@mui/icons-material/FindInPage";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
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

  const extendedColumns = useMemo(
    () => [
      ...legislationInitiativesTableColumns,
      {
        field: "details",
        headerName: "Detalii",
        sortable: false,
        flex: 0.2,
        renderCell: (row) => (
          <IconButton onClick={() => console.log(row)}>
            <FindInPageIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  return (
    <Table
      columns={extendedColumns}
      getRowId={(row) => row.docid}
      height={510}
      pageSize={5}
      rows={data ?? []}
    />
  );
};

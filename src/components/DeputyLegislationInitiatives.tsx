import FindInPageIcon from "@mui/icons-material/FindInPage";
import { IconButton } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import {
  useCurrentLegislatureDetailsQuery,
  useLegislationInitiativesByDeputyQuery,
} from "../queries";
import { legislationInitiativesTableColumns } from "../utils";
import { Table } from "./Table";

type DeputyLegislationInitiativesProps = {
  did: string;
};

export const DeputyLegislationInitiatives = ({
  did,
}: DeputyLegislationInitiativesProps) => {
  const [fromDate, setFromDate] = useState<Date>(new Date(Date.now()));
  const [toDate, setToDate] = useState<Date>(new Date(Date.now()));
  const { data, isFetching: isLoadingInitiatives } =
    useLegislationInitiativesByDeputyQuery(did);
  const { isFetching: isLoadingLegislatureDetails } =
    useCurrentLegislatureDetailsQuery({
      onSuccess: ({ legislature_from }) => {
        setFromDate(new Date(legislature_from));
      },
    });

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

  const filteredInitiatives = useMemo(() => {
    if (isLoadingInitiatives || isLoadingLegislatureDetails || !data) return [];

    return data?.filter((initiative) => {
      const regDate = new Date(initiative.data_reg);
      return regDate >= fromDate && regDate <= toDate;
    });
  }, [
    data,
    fromDate,
    isLoadingInitiatives,
    isLoadingLegislatureDetails,
    toDate,
  ]);

  const onFromDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    setFromDate(date);
  }, []);

  const onToDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    setToDate(date);
  }, []);

  return (
    <Table
      columns={extendedColumns}
      fromDate={fromDate}
      getRowId={(row) => row.docid}
      height={510}
      isLoading={isLoadingInitiatives || isLoadingLegislatureDetails}
      onFromDateChange={onFromDateChange}
      onToDateChange={onToDateChange}
      pageSize={5}
      rows={filteredInitiatives}
      showSearch
      showDatePickers
      toDate={toDate}
    />
  );
};

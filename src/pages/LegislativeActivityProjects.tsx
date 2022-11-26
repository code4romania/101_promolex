import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Grid, IconButton, Stack } from "@mui/material";
import { Table } from "../components/Table";
import {
  useCurrentLegislatureDetailsQuery,
  useRegisteredProjectsQuery,
} from "../queries";
import {
  getDateString,
  getProjectsByTypeChartData,
  legislationInitiativesTableColumns,
} from "../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  DetailsDialog,
  LegislationInitiativeDetails,
  StatisticsPieChart,
} from "../components";
import { Fragment, useCallback, useMemo, useState } from "react";
import { uniqueId } from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

export const LegislativeActivityProjects = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date(Date.now()));
  const [toDate, setToDate] = useState<Date>(new Date(Date.now()));
  useCurrentLegislatureDetailsQuery({
    onSuccess: ({ legislature_from, legislature_to }) => {
      setFromDate(new Date(legislature_from));
      setToDate(new Date(legislature_to));
    },
  });
  const { data: registeredProjects } = useRegisteredProjectsQuery(
    getDateString(fromDate),
    getDateString(toDate)
  );

  const projectsByTypeChartData = getProjectsByTypeChartData(
    registeredProjects ?? []
  );

  const onFromDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    setFromDate(date);
  }, []);

  const onToDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    setToDate(date);
  }, []);

  const [docId, setDocId] = useState("");
  const extendedColumns = useMemo(
    () => [
      ...legislationInitiativesTableColumns,
      {
        field: "details",
        headerName: "Detalii",
        sortable: false,
        flex: 0.2,
        renderCell: ({ row }) => (
          <IconButton onClick={() => setDocId(row.docid)}>
            <FindInPageIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  return (
    <Fragment>
      <Stack gap={8} pt={8}>
        <Grid
          container
          columnSpacing={8}
          justifyContent="center"
          rowSpacing={6}
        >
          <Grid item xs lg={6}>
            <StatisticsPieChart
              data={projectsByTypeChartData}
              title="Tipul proiectului"
            />
          </Grid>
        </Grid>
        <Table
          columns={extendedColumns}
          fromDate={fromDate}
          height={510}
          getRowId={(row) => row.docid ?? uniqueId()}
          onFromDateChange={onFromDateChange}
          onToDateChange={onToDateChange}
          pageSize={5}
          rows={registeredProjects ?? []}
          showSearch
          showDatePickers
          toDate={toDate}
        />
      </Stack>
      <DetailsDialog open={Boolean(docId)} handleClose={() => setDocId("")}>
        <LegislationInitiativeDetails docId={docId} />
      </DetailsDialog>
    </Fragment>
  );
};

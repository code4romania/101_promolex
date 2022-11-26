import { Grid } from "@mui/material";
import { getProjectsByTypeChartData } from "../utils";
import { LegislativeActivityWrapper, StatisticsPieChart } from "../components";
import { useRegisteredProjects } from "../hooks";

export const LegislativeActivityProjects = () => {
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  } = useRegisteredProjects();

  const projectsByTypeChartData = getProjectsByTypeChartData(
    registeredProjects ?? []
  );

  return (
    <LegislativeActivityWrapper
      fromDate={fromDate}
      onFromDateChange={onFromDateChange}
      onToDateChange={onToDateChange}
      registeredProjects={registeredProjects ?? []}
      toDate={toDate}
    >
      <Grid container columnSpacing={8} justifyContent="center" rowSpacing={6}>
        <Grid item xs lg={6}>
          <StatisticsPieChart
            data={projectsByTypeChartData}
            title="Tipul proiectului"
          />
        </Grid>
      </Grid>
    </LegislativeActivityWrapper>
  );
};

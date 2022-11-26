import { Grid } from "@mui/material";
import { has } from "lodash";
import { LegislativeActivityWrapper, StatisticsBarChart } from "../components";
import { useRegisteredProjects } from "../hooks";
import { getProjectsByStatuteAndTypeChartData } from "../utils";

export const LegislativeActivityStatute = () => {
  const {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  } = useRegisteredProjects();

  if (has(registeredProjects, "error")) {
    return null;
  }

  const projectsInExamination = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    "în examinare"
  );
  const projectsPassed = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    "adoptat"
  );
  const projectsRejected = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    "respins"
  );
  const projectsMerged = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    "comasat"
  );
  const projectsRetracted = getProjectsByStatuteAndTypeChartData(
    registeredProjects ?? [],
    "retras"
  );

  return (
    <LegislativeActivityWrapper
      fromDate={fromDate}
      onFromDateChange={onFromDateChange}
      onToDateChange={onToDateChange}
      registeredProjects={registeredProjects ?? []}
      toDate={toDate}
    >
      <Grid container columnSpacing={6} justifyContent="center" rowSpacing={6}>
        <Grid item xs lg={4}>
          <StatisticsBarChart
            data={projectsInExamination}
            title="Proiecte în examinare"
          />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart data={projectsPassed} title="Proiecte adoptate" />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart
            data={projectsRejected}
            title="Proiecte respinse"
          />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart data={projectsMerged} title="Proiecte comasate" />
        </Grid>
        <Grid item xs lg={4}>
          <StatisticsBarChart
            data={projectsRetracted}
            title="Proiecte retrase"
          />
        </Grid>
      </Grid>
    </LegislativeActivityWrapper>
  );
};

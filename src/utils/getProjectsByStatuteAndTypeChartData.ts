import { ChartData } from "chart.js";
import { chain, filter, values } from "lodash";
import { LegislationInitiative, LegislationInitiativeStatute } from "../types";

const projectTypeMap = [
  {
    color: "#0081A7",
    key: "lege",
    label: "Legi",
  },
  { color: "#ADBCA5", key: "hotărâre", label: "Hotărâri" },
  { color: "#FFC896", key: "moțiune", label: "Moțiuni" },
];

export const getProjectsByStatuteAndTypeChartData = (
  projects: LegislationInitiative[],
  statute: LegislationInitiativeStatute
): ChartData<"bar", number[], string> => {
  const projectsByStatute = chain(projects)
    .groupBy("proiect_act")
    .toPairs()
    .map(([type, projects]) => {
      const filteredProjects = filter(
        projects,
        ({ statut_proiect }) => statut_proiect.toLowerCase() === statute
      );

      return [type, filteredProjects];
    })
    .fromPairs()
    .sortBy(projectTypeMap.map(({ key }) => key))
    .value();

  const barColors = projectTypeMap.map(({ color }) => color);

  const labels: string[] = projectTypeMap.map(({ label }) => label);

  return {
    labels: ["În examinare"],
    datasets: values(projectsByStatute).map((p, index) => ({
      label: labels[index],
      data: [p.length > 0 ? p.length : undefined],
      backgroundColor: barColors[index],
    })),
  };
};

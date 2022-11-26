import { Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import { DeputiesByFaction } from "../components";
import { DeputiesByLegislature } from "../components/DeputiesByLegislature";
import {
  Deputies,
  DeputyDetails,
  LegislativeActivity,
  LegislativeActivityProjects,
  LegislativeActivityStatute,
  Root,
} from "../pages";
import { LegislativeActivityRoutes, Routes } from "../types";

export const router = createBrowserRouter([
  {
    path: Routes.AboutProject,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Typography>Despre</Typography>,
      },
      {
        path: Routes.Deputies,
        element: <Deputies />,
        children: [
          {
            index: true,
            element: <DeputiesByLegislature />,
          },
          {
            path: `${Routes.Deputies}/:fid`,
            element: <DeputiesByFaction />,
          },
        ],
      },
      {
        path: `${Routes.Deputies}/detalii/:did`,
        element: <DeputyDetails />,
      },
      {
        path: Routes.LegislativeActivity,
        element: <LegislativeActivity />,
        children: [
          {
            path: `${Routes.LegislativeActivity}${LegislativeActivityRoutes.projects}`,
            element: <LegislativeActivityProjects />,
          },
          {
            path: `${Routes.LegislativeActivity}${LegislativeActivityRoutes.statute}`,
            element: <LegislativeActivityStatute />,
          },
          {
            path: `${Routes.LegislativeActivity}${LegislativeActivityRoutes.domains}`,
            element: <Typography>Domeniile proiectelor</Typography>,
          },
        ],
      },
      {
        path: Routes.PlenaryMeetings,
        element: <Typography>Ședințe plenare</Typography>,
      },
      {
        path: Routes.Reports,
        element: <Typography>Rapoarte</Typography>,
      },
      {
        path: Routes.News,
        element: <Typography>Noutăți</Typography>,
      },
    ],
  },
]);

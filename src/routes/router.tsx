import { Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import { Deputies, DeputyDetails, Root } from "../pages";
import { Routes } from "../types";

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
      },
      {
        path: `${Routes.Deputies}/:id`,
        element: <DeputyDetails />,
      },
      {
        path: Routes.LegislativeActivity,
        element: <Typography>Activitate legislativă</Typography>,
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

import { Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import { Deputies, Root } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Typography>Despre</Typography>,
      },
      {
        path: "deputati",
        element: <Deputies />,
      },
      {
        path: "activitate",
        element: <Typography>Activitate legislativă</Typography>,
      },
      {
        path: "sedinte",
        element: <Typography>Ședințe plenare</Typography>,
      },
      {
        path: "rapoarte",
        element: <Typography>Rapoarte</Typography>,
      },
      {
        path: "noutati",
        element: <Typography>Noutăți</Typography>,
      },
    ],
  },
]);

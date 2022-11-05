import { Stack } from "@mui/material";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Stack pb={8}>
      <Navbar />
      <Outlet />
    </Stack>
  );
};

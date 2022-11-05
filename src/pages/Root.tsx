import { Container, Stack } from "@mui/material";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Stack>
      <Navbar />;
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
};

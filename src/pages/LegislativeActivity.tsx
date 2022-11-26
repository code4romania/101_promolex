import { Stack, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

export const LegislativeActivity = () => {
  return (
    <Stack gap={4}>
      <Header title="Proiecte de legi și hotărâri" />
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
};

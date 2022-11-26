import { Stack, Container, Box, Tab, Tabs, styled } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components";
import { Routes } from "../types";
import { routesConfig } from "../utils";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.common.black,
  textTransform: "none",
  "&.Mui-selected": {
    color: theme.palette.common.black,
    backgroundColor: "#F3F4F6",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const legislativeActivityRoute = routesConfig.find(
  ({ route }) => route === Routes.LegislativeActivity
);

export const LegislativeActivity = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    navigate(newValue);
  };

  return (
    <Stack gap={4}>
      <Header title="Proiecte de legi și hotărâri" />
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={pathname} onChange={handleChange}>
            {legislativeActivityRoute?.subRoutes?.map(({ label, route }) => (
              <StyledTab key={label} label={label} value={route} />
            ))}
          </Tabs>
        </Box>
        <Outlet />
      </Container>
    </Stack>
  );
};

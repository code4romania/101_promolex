import { Box, Container, Stack, styled, useTheme } from "@mui/material";
import { NavLink, NavLinkProps } from "react-router-dom";
import { routesConfig } from "../utils";

const StyledNavLink = styled(NavLink)<NavLinkProps>(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: 18,
  fontWeight: 700,
  textDecoration: "none",
}));

export const Navbar = () => {
  const { palette } = useTheme();

  return (
    <Box bgcolor={palette.primary.main}>
      <Container>
        <Stack direction="row" justifyContent="flex-end" gap={10} py={8}>
          {routesConfig.map(({ label, route }) => (
            <StyledNavLink
              key={route}
              style={({ isActive }) =>
                isActive ? { color: palette.primary.dark } : undefined
              }
              to={route}
            >
              {label}
            </StyledNavLink>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

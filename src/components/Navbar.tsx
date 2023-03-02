import {
  Box,
  ButtonBase,
  ButtonBaseProps,
  Container,
  Menu,
  MenuItem,
  Stack,
  styled,
  useTheme,
} from '@mui/material';
import { Fragment, MouseEvent, useState } from 'react';
import { Link, NavLink, NavLinkProps, useNavigate } from 'react-router-dom';
import logo101Promolex from '../assets/images/logo_101_promolex.png';
import { Routes } from '../types';
import { routesConfig } from '../utils';

const StyledNavLink = styled(NavLink)<NavLinkProps>(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: 18,
  fontWeight: 700,
  textDecoration: 'none',
}));

const StyledButton = styled(ButtonBase)<ButtonBaseProps>(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: 18,
  fontWeight: 700,
}));

export function Navbar() {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path?: string) => () => {
    setAnchorEl(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <Box bgcolor={palette.primary.main}>
      <Container>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='flex-end'
          gap={10}
          py={1}
        >
          <Box mr='auto'>
            <Link to={Routes.Home}>
              <img alt='Logo 101 Promo-LEX' height={85} src={logo101Promolex} />
            </Link>
          </Box>
          {routesConfig.map(({ label, route, subRoutes }) =>
            !subRoutes?.length ? (
              <StyledNavLink
                key={route}
                style={({ isActive }) =>
                  isActive ? { color: palette.primary.dark } : undefined
                }
                to={route}
              >
                {label}
              </StyledNavLink>
            ) : (
              <Fragment key={route}>
                <StyledButton onClick={handleClick}>{label}</StyledButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose()}>
                  {subRoutes.map((subRoute) => (
                    <MenuItem
                      key={subRoute.route}
                      onClick={handleClose(subRoute.route)}
                    >
                      {subRoute.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Fragment>
            ),
          )}
        </Stack>
      </Container>
    </Box>
  );
}

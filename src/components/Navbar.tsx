import MenuIcon from '@mui/icons-material/Menu';
import {
  alpha,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Fragment,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import {
  Link,
  NavLink,
  NavLinkProps,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import logo101Promolex from '../assets/images/logo_101_promolex.png';
import { Routes } from '../types';
import { routesConfig } from '../utils';

const StyledNavLink = styled(NavLink)<NavLinkProps>(() => ({
  color: 'inherit',
  fontSize: 18,
  fontWeight: 700,
  textDecoration: 'none',
}));

const StyledMenu = styled(Menu)<MenuProps>(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,

  '& .MuiBackdrop-root': {
    background: alpha(theme.palette.common.black, 0.5),
  },
}));

export function Navbar() {
  const { palette } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path?: string) => () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
    if (path) {
      navigate(path);
    }
  };

  const openMenu = Boolean(menuAnchorEl);

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const toggleMenu = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const target = !menuAnchorEl ? event.currentTarget : null;
      setMenuAnchorEl(target);
    },
    [menuAnchorEl],
  );

  return (
    <Box bgcolor={palette.primary.main}>
      <Container>
        <Stack
          alignItems='center'
          direction='row'
          display={{ xs: 'none', sm: 'flex' }}
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
                  isActive
                    ? { color: palette.primary.dark }
                    : { color: palette.common.white }
                }
                to={route}
              >
                {label}
              </StyledNavLink>
            ) : (
              <Fragment key={route}>
                <Typography
                  color={
                    pathname.includes(Routes.LegislativeActivity)
                      ? 'primary.dark'
                      : 'common.white'
                  }
                  onClick={handleClick}
                  fontSize={18}
                  fontWeight={700}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  {label}
                </Typography>
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

        <Box
          alignItems='center'
          display={{ xs: 'flex', md: 'none' }}
          justifyContent='flex-end'
        >
          <Link to={Routes.Home}>
            <img alt='Logo 101 Promo-LEX' height={85} src={logo101Promolex} />
          </Link>

          <IconButton onClick={toggleMenu} size='large'>
            <MenuIcon />
          </IconButton>
          <StyledMenu
            anchorEl={menuAnchorEl}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
            elevation={1}
            onClose={closeMenu}
            open={openMenu}
            PaperProps={{
              sx: {
                left: '0 !important',
                maxWidth: '100%',
                right: 0,
                width: '100%',
              },
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            {routesConfig.map(({ label, route, subRoutes }) =>
              !subRoutes?.length ? (
                <MenuItem key={route} onClick={toggleMenu}>
                  <StyledNavLink
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: palette.primary.dark,
                            fontWeight: 700,
                            flexGrow: 1,
                          }
                        : { flexGrow: 1 }
                    }
                    to={route}
                  >
                    {label}
                  </StyledNavLink>
                </MenuItem>
              ) : (
                <MenuItem key={route}>
                  <Typography
                    color={
                      pathname.includes(Routes.LegislativeActivity)
                        ? 'primary.dark'
                        : 'inherit'
                    }
                    onClick={handleClick}
                    flexGrow={1}
                    fontSize={18}
                    fontWeight={700}
                  >
                    {label}
                  </Typography>
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
                </MenuItem>
              ),
            )}
          </StyledMenu>
        </Box>
      </Container>
    </Box>
  );
}

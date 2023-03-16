import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledRouterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

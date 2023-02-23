import { styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const BreadCrumbLink = styled(RouterLink)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.grey[500],
  display: 'flex',
  fontWeight: 500,

  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

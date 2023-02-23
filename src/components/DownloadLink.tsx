import { Link, styled } from '@mui/material';

export const DownloadLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: 20,
  textDecoration: 'none',

  '&:hover': {
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: 'underline',
  },
}));

import { styled, Tab, TabProps, Tabs, TabsProps } from '@mui/material';

export const SecondaryTab = styled((props: TabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 8,
  color: theme.palette.grey[900],
  fontWeight: theme.typography.fontWeightMedium,
  padding: theme.spacing(2, 3),
  textTransform: 'none',

  '&.Mui-selected': {
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[100],
  },
}));

export const SecondaryTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
});

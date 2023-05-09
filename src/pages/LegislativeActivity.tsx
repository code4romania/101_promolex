import { Stack, Container, Box, Tab, Tabs, styled } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Header,
  LegislativeActivityDomains,
  LegislativeActivityProjects,
  LegislativeActivityStatute,
} from '../components';

type StyledTabProps = {
  label: string;
};

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 8,
  color: theme.palette.grey[500],
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 16,
  textTransform: 'none',

  '&.Mui-selected': {
    color: theme.palette.grey[800],
    // backgroundColor: '#F3F4F6',
  },
}));

export function LegislativeActivity() {
  const [params, setParams] = useSearchParams();
  const tabValue = parseInt(params.get('tab') ?? '0', 10);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setParams({ tab: newValue.toString() });
  };

  return (
    <Stack gap={4} pb={6}>
      <Header title='Proiecte de legi și hotărâri' />
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth'>
            <StyledTab label='Proiecte înregistrate' />
            <StyledTab label='Statutul proiectelor' />
            <StyledTab label='Domeniile proiectelor' />
          </Tabs>
        </Box>

        {tabValue === 0 && <LegislativeActivityProjects />}
        {tabValue === 1 && <LegislativeActivityStatute />}
        {tabValue === 2 && <LegislativeActivityDomains />}
      </Container>
    </Stack>
  );
}

import { Box, styled, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import {
  ControlExportEvaluation,
  ControlInvestigationCommittees,
  ControlMotions,
  ControlPublicInstitutions,
  ControlQuestions,
  ControlReports,
  ControlSpecialCommittees,
  PageContainer,
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
  },
}));

export function ControlPage() {
  const { breakpoints } = useTheme();
  const isLargeScreen = useMediaQuery(breakpoints.up('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <PageContainer pageTitle='Control parlamentar'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isLargeScreen ? 'fullWidth' : 'scrollable'}
        >
          <StyledTab label='Întrebări/interpelări' />
          <StyledTab label='Evaluarea ex-post' />
          <StyledTab label='Rapoarte' />
          <StyledTab label='Audieri ale instituțiilor publice' />
          <StyledTab label='Comisii speciale' />
          <StyledTab label='Comisii de anchetă' />
          <StyledTab label='Moțiuni' />
        </Tabs>
      </Box>

      {tabValue === 0 && <ControlQuestions />}
      {tabValue === 1 && <ControlExportEvaluation />}
      {tabValue === 2 && <ControlReports />}
      {tabValue === 3 && <ControlPublicInstitutions />}
      {tabValue === 4 && <ControlSpecialCommittees />}
      {tabValue === 5 && <ControlInvestigationCommittees />}
      {tabValue === 6 && <ControlMotions />}
    </PageContainer>
  );
}

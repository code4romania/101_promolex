import { Box, styled, Tab, Tabs } from '@mui/material';
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
  textTransform: 'none',

  '&.Mui-selected': {
    color: theme.palette.grey[800],
  },
}));

export function ControlPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <PageContainer pageTitle='Control parlamentar'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth'>
          <StyledTab label='Întrebări/interpelări' />
          <StyledTab label='Evaluarea ex-post' />
          <StyledTab label='Rapoarte' />
          <StyledTab label='Audieri ale instituților publice' />
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

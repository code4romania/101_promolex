import { Box, Stack, styled, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';
import {
  CommitteeDetails,
  CommitteeSummary,
  Loading,
  PageContainer,
} from '../components';
import { useCommitteesByLegislatureQuery } from '../queries';

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
    // backgroundColor: '#F3F4F6',
  },
}));

export function CommitteesPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { data: committees, isLoading: isCommitteesLoading } =
    useCommitteesByLegislatureQuery();

  return (
    <PageContainer pageTitle='Comisii parlamentare permanente'>
      <Box
        boxShadow={2}
        // border={1}
        // borderColor='secondary.main'
        sx={{
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        <Tabs
          onChange={handleTabChange}
          scrollButtons='auto'
          value={tabValue}
          variant='fullWidth'
        >
          <StyledTab label='Comisii parlamentare permanente' />
          <StyledTab label='Grafice despre activitatea Comisiilor ' />
        </Tabs>
      </Box>

      {tabValue === 0 &&
        (isCommitteesLoading ? (
          <Loading />
        ) : (
          <Stack gap={6} mt={10}>
            {/* @todo missing watched from committees data. Ask from API */}
            {committees?.map(({ cid, committee }) => (
              <CommitteeSummary key={cid} name={committee}>
                <CommitteeDetails cid={cid} />
              </CommitteeSummary>
            ))}

            <Box>
              <Typography fontWeight='medium' textTransform='uppercase'>
                Notă:
              </Typography>
              <Typography>
                Comisiile parlamentare permanente monitorizate de către
                Asociația Promo-LEX sunt marcate cu mov.
              </Typography>
            </Box>
          </Stack>
        ))}
    </PageContainer>
  );
}

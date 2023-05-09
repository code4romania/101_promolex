import { Box, Stack, styled, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CommitteeDetails,
  CommitteesActivityCharts,
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
  fontSize: 16,
  textTransform: 'none',

  '&.Mui-selected': {
    color: theme.palette.grey[800],
    // backgroundColor: '#F3F4F6',
  },
}));

export function CommitteesPage() {
  const [params, setParams] = useSearchParams();
  const tabValue = parseInt(params.get('tab') ?? '0', 10);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setParams({ tab: newValue.toString() });
  };

  const { data: committees, isLoading: isCommitteesLoading } =
    useCommitteesByLegislatureQuery();

  return (
    <PageContainer pageTitle='Comisii parlamentare permanente'>
      <Box
        boxShadow={2}
        sx={{
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        <Tabs onChange={handleTabChange} scrollButtons='auto' value={tabValue}>
          <StyledTab label='Comisii parlamentare permanente' />
          <StyledTab label='Grafice despre activitatea Comisiilor ' />
        </Tabs>
      </Box>

      {tabValue === 0 &&
        (isCommitteesLoading ? (
          <Loading />
        ) : (
          <Stack gap={6} mt={10}>
            {committees?.map(({ cid, committee, hasDetails }) => (
              <CommitteeSummary
                key={cid}
                name={committee}
                watched={hasDetails === 'yes'}
              >
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

      {tabValue === 1 && <CommitteesActivityCharts />}
    </PageContainer>
  );
}

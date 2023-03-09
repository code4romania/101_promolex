import {
  Box,
  Stack,
  styled,
  Tab,
  Tabs,
  TabsProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

type StyledTabProps = {
  label: string;
};

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 8,
  color: theme.palette.common.black,
  fontWeight: theme.typography.fontWeightBold,
  padding: theme.spacing(2, 3),
  textTransform: 'none',
  '&.Mui-selected': {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    alignItems: 'center',
    padding: theme.spacing(2, 9),
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
}));

type DeputyActivityProps = {
  committee?: string;
  delegates?: string;
  investigationCommittees?: string[];
  friendships?: string;
  mandatesCount?: string;
  specialCommittees?: string[];
};

export function DeputyActivity({
  committee,
  delegates,
  investigationCommittees,
  friendships,
  mandatesCount,
  specialCommittees,
}: DeputyActivityProps) {
  const { breakpoints } = useTheme();
  const isLargeScreen = useMediaQuery(breakpoints.up('sm'));
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack gap={5}>
      <Typography fontWeight={700} variant='h4'>
        Activitate parlamentară
      </Typography>

      <Box>
        <Box
          boxShadow={2}
          border={1}
          borderColor='secondary.main'
          borderRadius={2}
        >
          <StyledTabs
            onChange={handleChange}
            scrollButtons='auto'
            value={value}
            variant={isLargeScreen ? 'fullWidth' : 'scrollable'}
          >
            <StyledTab label='Comisia parlamentară' />
            <StyledTab label='Comisii speciale/ de anchetă' />
            <StyledTab label='Delegații parlamentare' />
            <StyledTab label='Apartenența la grupurile de prietenie internaționale / adunări parlamentare:' />
            <StyledTab label='Numarul de mandate/ Legislatura' />
          </StyledTabs>
        </Box>

        <Box height={260} overflow='auto' p={4}>
          {value === 0 && <Typography fontSize={20}>{committee}</Typography>}
          {value === 1 && (
            <>
              {(specialCommittees?.length ?? 0) > 0 && (
                <>
                  <Typography fontSize={20} fontWeight={700}>
                    Comisii speciale:
                  </Typography>
                  {specialCommittees?.map((specialCommittee) => (
                    <Typography key={specialCommittee} fontSize={20}>
                      {specialCommittee}
                    </Typography>
                  ))}
                </>
              )}
              {(investigationCommittees?.length ?? 0) > 0 && (
                <>
                  <Typography fontSize={20} fontWeight={700}>
                    Comisii de anchetă:
                  </Typography>
                  {investigationCommittees?.map((investigationCommittee) => (
                    <Typography key={investigationCommittee} fontSize={20}>
                      {investigationCommittee}
                    </Typography>
                  ))}
                </>
              )}
            </>
          )}
          {value === 2 && <Typography fontSize={20}>{delegates}</Typography>}
          {value === 3 &&
            friendships?.split(/\r\n/).map((text) => (
              <Typography key={text} fontSize={20}>
                {text}
              </Typography>
            ))}
          {value === 4 && (
            <Typography fontSize={20}>{mandatesCount}</Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

DeputyActivity.defaultProps = {
  committee: '',
  delegates: '',
  investigationCommittees: [],
  friendships: '',
  mandatesCount: '',
  specialCommittees: [],
};

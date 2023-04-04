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
  deputyFrom?: string;
  deputyTo?: string;
  friendships?: string;
  investigationCommittees?: string[];
  mandatesCount?: string;
  mandatesDetails?: string;
  specialCommittees?: string[];
};

export function DeputyActivity({
  committee,
  delegates,
  deputyFrom,
  deputyTo,
  investigationCommittees,
  friendships,
  mandatesCount,
  mandatesDetails,
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
      <Typography fontWeight={700} variant='h5'>
        Activitate parlamentară, mandat actual {deputyFrom} - {deputyTo}
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
            <StyledTab label='Grupuri de prietenie internaționale/adunări parlamentare' />
            <StyledTab label='Numarul de mandate/ Legislatura' />
          </StyledTabs>
        </Box>

        <Box height={180} overflow='auto' p={4}>
          {value === 0 && <Typography>{committee}</Typography>}
          {value === 1 && (
            <>
              {(specialCommittees?.length ?? 0) > 0 && (
                <>
                  <Typography fontWeight={700}>Comisii speciale:</Typography>
                  {specialCommittees?.map((specialCommittee) => (
                    <Typography key={specialCommittee}>
                      {specialCommittee}
                    </Typography>
                  ))}
                </>
              )}
              {(investigationCommittees?.length ?? 0) > 0 && (
                <>
                  <Typography fontWeight={700}>Comisii de anchetă:</Typography>
                  {investigationCommittees?.map((investigationCommittee) => (
                    <Typography key={investigationCommittee}>
                      {investigationCommittee}
                    </Typography>
                  ))}
                </>
              )}
            </>
          )}
          {value === 2 &&
            delegates
              ?.split(/\r\n/)
              .map((text) => <Typography key={text}>{text}</Typography>)}
          {value === 3 &&
            friendships
              ?.split(/\r\n/)
              .map((text) => <Typography key={text}>{text}</Typography>)}
          {value === 4 && (
            <>
              <Typography>{mandatesCount}</Typography>
              <Typography>{mandatesDetails}</Typography>
            </>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

DeputyActivity.defaultProps = {
  committee: '',
  delegates: '',
  deputyFrom: '',
  deputyTo: '',
  investigationCommittees: [],
  friendships: '',
  mandatesCount: '',
  mandatesDetails: '',
  specialCommittees: [],
};

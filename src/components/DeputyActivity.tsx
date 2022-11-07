import { Box, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

type StyledTabProps = {
  label: string;
};

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  color: theme.palette.common.black,
  fontWeight: theme.typography.fontWeightBold,
  textTransform: "none",
  "&.Mui-selected": {
    color: theme.palette.common.black,
    backgroundColor: "#F3F4F6",
  },
}));

type DeputyActivityProps = {
  committee?: string;
  delegates?: string;
  factionName?: string;
  friendships?: string;
};

export const DeputyActivity = ({
  committee,
  delegates,
  factionName,
  friendships,
}: DeputyActivityProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack gap={5}>
      <Typography fontWeight={700} variant="h4">
        Activitate parlamentară
      </Typography>

      <Box>
        <Box boxShadow={2}>
          <Tabs
            onChange={handleChange}
            scrollButtons="auto"
            value={value}
            variant="scrollable"
          >
            <StyledTab label="Fracțiunea politică" />
            <StyledTab label="Comisia parlamentară" />
            <StyledTab label="Comisii speciale/ Comisii de anchetă" />
            <StyledTab label="Delegații parlamentare" />
            <StyledTab label="Apartenența la grupurile de prietenie internaționale / adunări parlamentare:" />
          </Tabs>
        </Box>

        <Box height={260} overflow="auto" p={4}>
          {value === 0 && <Typography fontSize={20}>{factionName}</Typography>}
          {value === 1 && <Typography fontSize={20}>{committee}</Typography>}
          {value === 3 && <Typography fontSize={20}>{delegates}</Typography>}
          {value === 4 &&
            friendships
              ?.split(/\r\n/)
              .map((text) => <Typography fontSize={20}>{text}</Typography>)}
        </Box>
      </Box>
    </Stack>
  );
};

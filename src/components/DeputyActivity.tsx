import { Box, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { CARD_BORDER } from "../constants";

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
  investigationCommittees?: string[];
  friendships?: string;
  mandatesCount?: string;
  specialCommittees?: string[];
};

export const DeputyActivity = ({
  committee,
  delegates,
  investigationCommittees,
  friendships,
  mandatesCount,
  specialCommittees,
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
        <Box
          boxShadow={2}
          border={1}
          borderColor={CARD_BORDER}
          borderRadius={2}
        >
          <Tabs
            onChange={handleChange}
            scrollButtons="auto"
            value={value}
            variant="scrollable"
          >
            <StyledTab label="Comisia parlamentară" />
            <StyledTab label="Comisii speciale/ de anchetă" />
            <StyledTab label="Delegații parlamentare" />
            <StyledTab label="Apartenența la grupurile de prietenie internaționale / adunări parlamentare:" />
            <StyledTab label="Numarul de mandate/ Legislatura" />
          </Tabs>
        </Box>

        <Box height={260} overflow="auto" p={4}>
          {value === 0 && <Typography fontSize={20}>{committee}</Typography>}
          {value === 1 && (
            <Fragment>
              {(specialCommittees?.length ?? 0) > 0 && (
                <Fragment>
                  <Typography fontSize={20} fontWeight={700}>
                    Comisii speciale:
                  </Typography>
                  {specialCommittees?.map((specialCommittee) => (
                    <Typography fontSize={20}>{specialCommittee}</Typography>
                  ))}
                </Fragment>
              )}
              {(investigationCommittees?.length ?? 0) > 0 && (
                <Fragment>
                  <Typography fontSize={20} fontWeight={700}>
                    Comisii de anchetă:
                  </Typography>
                  {investigationCommittees?.map((investigationCommittee) => (
                    <Typography fontSize={20}>
                      {investigationCommittee}
                    </Typography>
                  ))}
                </Fragment>
              )}
            </Fragment>
          )}
          {value === 2 && <Typography fontSize={20}>{delegates}</Typography>}
          {value === 3 &&
            friendships
              ?.split(/\r\n/)
              .map((text) => <Typography fontSize={20}>{text}</Typography>)}
          {value === 4 && (
            <Typography fontSize={20}>{mandatesCount}</Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

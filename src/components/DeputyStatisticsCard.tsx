import { Box, Stack, Typography } from "@mui/material";
import { CARD_BORDER } from "../constants";

type DeputyStatisticsCardProps = {
  count?: number;
  title: string;
};

export const DeputyStatisticsCard = ({
  count,
  title,
}: DeputyStatisticsCardProps) => {
  return (
    <Stack border={1} borderColor={CARD_BORDER} borderRadius={2} height={245}>
      <Box px={9} py={5} borderBottom={1} borderColor={CARD_BORDER}>
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
      <Box
        alignItems="center"
        display="flex"
        flexGrow={1}
        justifyContent="center"
      >
        <Typography color="#88A9B5" fontSize={60} fontWeight={700}>
          {count}
        </Typography>
      </Box>
    </Stack>
  );
};

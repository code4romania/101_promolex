import { Box, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { CARD_BORDER } from "../constants";

type DeputyStatisticsCardProps = {
  title: string;
};

export const DeputyStatisticsCard = ({
  children,
  title,
}: PropsWithChildren<DeputyStatisticsCardProps>) => {
  return (
    <Stack
      border={1}
      borderColor={CARD_BORDER}
      borderRadius={2}
      height={245}
      boxShadow={3}
    >
      <Box px={9} py={5} borderBottom={1} borderColor={CARD_BORDER}>
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
      <Box
        alignItems="center"
        display="flex"
        flexGrow={1}
        justifyContent="center"
      >
        {children}
      </Box>
    </Stack>
  );
};

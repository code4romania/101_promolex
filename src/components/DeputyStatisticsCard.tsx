import { Box, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type DeputyStatisticsCardProps = {
  onClick?: () => void;
  title: string;
};

export function DeputyStatisticsCard({
  children,
  onClick,
  title,
}: PropsWithChildren<DeputyStatisticsCardProps>) {
  return (
    <Stack
      border={1}
      borderColor='secondary.main'
      borderRadius={2}
      boxShadow={3}
      height={245}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Box px={9} py={5} borderBottom={1} borderColor='secondary.main'>
        <Typography variant='subtitle1'>{title}</Typography>
      </Box>
      <Box
        alignItems='center'
        display='flex'
        flexGrow={1}
        justifyContent='center'
      >
        {children}
      </Box>
    </Stack>
  );
}

DeputyStatisticsCard.defaultProps = {
  onClick: undefined,
};

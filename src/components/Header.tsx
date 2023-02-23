import { Box, Container, Stack, Typography } from '@mui/material';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <Box boxShadow={2}>
      <Container>
        <Stack direction='row' py={6}>
          <Typography component='h2' fontSize={40} fontWeight='bold'>
            {title}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

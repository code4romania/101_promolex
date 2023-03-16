import { Box, Container, Stack, Typography } from '@mui/material';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <Box boxShadow={2}>
      <Container>
        <Stack direction='row' py={6}>
          <Typography variant='h3' fontWeight='bold'>
            {title}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

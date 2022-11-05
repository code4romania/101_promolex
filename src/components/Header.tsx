import { Box, Container, Stack, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <Box boxShadow={2}>
      <Container>
        <Stack direction="row" py={8}>
          <Typography fontWeight={700} variant="h2">
            {title}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

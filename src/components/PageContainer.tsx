import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Fab, Fade, Stack, useScrollTrigger } from '@mui/material';
import { ReactNode } from 'react';
import { Header } from '.';

type PageContainerProps = {
  children: ReactNode;
  pageTitle: string;
  showBackToTop?: boolean;
};

export function PageContainer({
  children,
  pageTitle,
  showBackToTop,
}: PageContainerProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Stack gap={4} pb={6} position='relative'>
      <Header title={pageTitle} />
      <Container>{children}</Container>

      {showBackToTop && (
        <Fade in={trigger}>
          <Fab
            color='secondary'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            size='small'
            sx={{ position: 'fixed', bottom: 40, right: 40 }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Fade>
      )}
    </Stack>
  );
}

PageContainer.defaultProps = {
  showBackToTop: false,
};

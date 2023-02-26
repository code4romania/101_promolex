import { Container, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { Header } from '.';

type PageContainerProps = {
  children: ReactNode;
  pageTitle: string;
};

export function PageContainer({ children, pageTitle }: PageContainerProps) {
  return (
    <Stack gap={4} pb={6}>
      <Header title={pageTitle} />
      <Container>{children}</Container>
    </Stack>
  );
}

import { Outlet } from 'react-router-dom';
import { PageContainer } from '../components';

export function EventsPage() {
  return (
    <PageContainer pageTitle='Noutăți' showBackToTop>
      <Outlet />
    </PageContainer>
  );
}

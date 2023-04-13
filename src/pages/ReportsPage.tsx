import { Outlet } from 'react-router-dom';
import { PageContainer } from '../components';

export function ReportsPage() {
  return (
    <PageContainer pageTitle='Publicații' showBackToTop>
      <Outlet />
    </PageContainer>
  );
}

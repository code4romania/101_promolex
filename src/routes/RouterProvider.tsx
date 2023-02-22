import { RouterProvider as RouterProviderCore } from 'react-router-dom';
import { router } from './router';

export function RouterProvider() {
  return <RouterProviderCore router={router} />;
}

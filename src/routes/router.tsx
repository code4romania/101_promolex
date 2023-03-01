import { createBrowserRouter } from 'react-router-dom';
import { DeputiesByFaction } from '../components';
import { DeputiesByLegislature } from '../components/DeputiesByLegislature';
import {
  AboutProjectPage,
  CommitteesPage,
  ControlPage,
  Deputies,
  DeputyDetails,
  EventDetailsPage,
  EventsListPage,
  EventsPage,
  HomePage,
  LegislativeActivity,
  ReportDetailsPage,
  ReportsListPage,
  ReportsPage,
  Root,
  SessionsPage,
} from '../pages';
import { LegislativeActivityRoutes, Routes } from '../types';

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: Routes.AboutProject,
        element: <AboutProjectPage />,
      },
      {
        path: Routes.Deputies,
        element: <Deputies />,
        children: [
          {
            index: true,
            element: <DeputiesByLegislature />,
          },
          {
            path: `${Routes.Deputies}/:fid`,
            element: <DeputiesByFaction />,
          },
        ],
      },
      {
        path: `${Routes.Deputies}/detalii/:did`,
        element: <DeputyDetails />,
      },
      {
        path: Routes.LegislativeActivity,
        children: [
          {
            path: LegislativeActivityRoutes.projects,
            element: <LegislativeActivity />,
          },
          {
            path: LegislativeActivityRoutes.committees,
            element: <CommitteesPage />,
          },
          {
            path: LegislativeActivityRoutes.control,
            element: <ControlPage />,
          },
        ],
      },
      {
        path: Routes.PlenaryMeetings,
        element: <SessionsPage />,
      },
      {
        path: Routes.Reports,
        element: <ReportsPage />,
        children: [
          {
            index: true,
            element: <ReportsListPage />,
          },
          {
            path: 'detalii/:rid',
            element: <ReportDetailsPage />,
          },
        ],
      },
      {
        path: Routes.News,
        element: <EventsPage />,
        children: [
          {
            index: true,
            element: <EventsListPage />,
          },
          {
            path: 'detalii/:eid',
            element: <EventDetailsPage />,
          },
        ],
      },
      {
        path: '/contact',
        element: <div>contact</div>,
      },
    ],
  },
]);

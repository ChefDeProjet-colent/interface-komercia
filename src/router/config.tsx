import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from '../pages/home/page';
import RegisterPage from '../pages/register/page';
import VerifyOTPPage from '../pages/verify-otp/page';
import EntrepriseLayout from '../pages/enterprise/layout';
import EntrepriseProfilePage from '../pages/enterprise/profile/page';
import EntrepriseCallForTendersPage from '../pages/enterprise/call-for-tenders/page';

// Lazy load components
const LoginPage = lazy(() => import('../pages/login/page'));
const CommercialPage = lazy(() => import('../pages/commercial/page'));
const LeadsPage = lazy(() => import('../pages/leads/page'));
const PipelinePage = lazy(() => import('../pages/pipeline/page'));
const ActivitiesPage = lazy(() => import('../pages/activities/page'));
const AnalyticsPage = lazy(() => import('../pages/analytics/page'));
const CommissionsPage = lazy(() => import('../pages/commissions/page'));
const ClientsPage = lazy(() => import('../pages/clients/page'));
const ConsultantsPage = lazy(() => import('../pages/consultants/page'));
const ManagersPage = lazy(() => import('../pages/managers/page'));
const TrainersPage = lazy(() => import('../pages/trainers/page'));
const StartupsPage = lazy(() => import('../pages/startups/page'));
const PartnersPage = lazy(() => import('../pages/partners/page'));
const EventsPage = lazy(() => import('../pages/events/page'));
const FinancialInstitutionsPage = lazy(() => import('../pages/financial-institutions/page'));
const EntreprisePage = lazy(() => import('../pages/enterprise/page'));
const EntrepriseProductsPage = lazy(() => import('../pages/enterprise/products/page'));
const MerchantsPage = lazy(() => import('../pages/merchants/page'));
const InformalMerchantsPage = lazy(() => import('../pages/informal-merchants/page'));
const KomerciaPage = lazy(() => import('../pages/komercia/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const EndCustomersPage = lazy(() => import('../pages/end-customers/page'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    )
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOTPPage />,
  },
  {
    path: '/commercial',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialPage />
      </Suspense>
    )
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialPage />
      </Suspense>
    )
  },
  {
    path: '/leads',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LeadsPage />
      </Suspense>
    )
  },
  {
    path: '/pipeline',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PipelinePage />
      </Suspense>
    )
  },
  {
    path: '/activities',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ActivitiesPage />
      </Suspense>
    )
  },
  {
    path: '/analytics',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AnalyticsPage />
      </Suspense>
    )
  },
  {
    path: '/commissions',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommissionsPage />
      </Suspense>
    )
  },
  {
    path: '/clients',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ClientsPage />
      </Suspense>
    )
  },
  {
    path: '/end-customers',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <EndCustomersPage />
      </Suspense>
    )
  },
  {
    path: '/consultants',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ConsultantsPage />
      </Suspense>
    )
  },
  {
    path: '/managers',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ManagersPage />
      </Suspense>
    )
  },
  {
    path: '/trainers',
    element: <TrainersPage />
  },
  {
    path: '/startups',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <StartupsPage />
      </Suspense>
    )
  },
  {
    path: '/partners',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PartnersPage />
      </Suspense>
    )
  },
  {
    path: '/events',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <EventsPage />
      </Suspense>
    )
  },
  {
    path: '/financial-institutions',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <FinancialInstitutionsPage />
      </Suspense>
    )
  },
  {
    path: '/enterprise',
    element: <EntrepriseLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntreprisePage />
          </Suspense>
        )
      },
      {
        path: 'profile',
        element: <EntrepriseProfilePage />,
      },
      {
        path: 'call-for-tenders',
        element: <EntrepriseCallForTendersPage />,
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseProductsPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/merchants',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MerchantsPage />
      </Suspense>
    )
  },
  {
    path: '/informal-merchants',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <InformalMerchantsPage />
      </Suspense>
    )
  },
  {
    path: '/komercia',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <KomerciaPage />
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    )
  }
];

export default routes;

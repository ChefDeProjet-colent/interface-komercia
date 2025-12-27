import { type RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from '../pages/home/page';
import RegisterPage from '../pages/register/page';
import VerifyOTPPage from '../pages/verify-otp/page';
import EntrepriseLayout from '../pages/enterprise/layout';

// Lazy load components
const LoginPage = lazy(() => import('../pages/login/page'));
const CommercialPage = lazy(() => import('../pages/commercial/page'));
const CommercialProfilePage = lazy(() => import('../pages/commercial/profile/page'));
const CommercialCallForTendersPage = lazy(() => import('../pages/commercial/call-for-tenders/page'));
const CommercialCallForTendersDetailsPage = lazy(() => import('../pages/commercial/call-for-tenders/details/page'));
const CommercialEntretiensPage = lazy(() => import('../pages/commercial/entretiens/page'));
const CommercialContratsPage = lazy(() => import('../pages/commercial/contrats/page'));
const CommercialProduitsPage = lazy(() => import('../pages/commercial/produits/page'));
const CommercialProduitsDetailsPage = lazy(() => import('../pages/commercial/produits/details/page'));
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
const EntrepriseProfilePage = lazy(() => import('../pages/enterprise/profile/page'));
const EntrepriseCallForTendersPage = lazy(() => import('../pages/enterprise/call-for-tenders/page').then(module => ({ default: module.default })));
const EntrepriseProductsPage = lazy(() => import('../pages/enterprise/products/page'));
const EntrepriseCandidaturesPage = lazy(() => import('../pages/enterprise/candidatures/page'));
const EntrepriseEntretiensPage = lazy(() => import('../pages/enterprise/entretiens/page'));
const EntrepriseContratsPage = lazy(() => import('../pages/enterprise/contrats/page'));
const MerchantsPage = lazy(() => import('../pages/merchants/page'));
const InformalMerchantsPage = lazy(() => import('../pages/informal-merchants/page'));
const KomerciaPage = lazy(() => import('../pages/komercia/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const EndCustomersPage = lazy(() => import('../pages/end-customers/page'));
const EndCustomersProduitsPage = lazy(() => import('../pages/end-customers/produits/page'));
const EndCustomersCommercialPage = lazy(() => import('../pages/end-customers/commercial/page'));
const EndCustomersCheckoutPage = lazy(() => import('../pages/end-customers/checkout/page'));
const EndCustomersOrdersPage = lazy(() => import('../pages/end-customers/orders/page'));

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
    element: <CommercialPage />,
  },
  {
    path: '/commercial/profile',
    element: <CommercialProfilePage />,
  },
  {
    path: '/commercial/call-for-tenders',
    element: <CommercialCallForTendersPage />,
  },
  {
    path: '/commercial/call-for-tenders/details/:id',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialCallForTendersDetailsPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/entretiens',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialEntretiensPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/contrats',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialContratsPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/produits',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialProduitsPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/produits/details/:id',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CommercialProduitsDetailsPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/leads',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LeadsPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/pipeline',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PipelinePage />
      </Suspense>
    )
  },
  // {
  //   path: '/dashboard',
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <CommercialPage />
  //     </Suspense>
  //   )
  // },
 
  {
    path: '/commercial/activities',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ActivitiesPage />
      </Suspense>
    )
  },
  {
    path: '/commercial/analytics',
    element: <AnalyticsPage />,
  },
  {
    path: '/commercial/performance',
    element: <AnalyticsPage />,
  },
 
  {
    path: '/commercial/commissions',
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
    element: <EndCustomersPage />,
  },
  {
    path: '/end-customers/produits',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <EndCustomersProduitsPage />
      </Suspense>
    ),
  },
  {
    path: '/end-customers/commercial',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <EndCustomersCommercialPage />
      </Suspense>
    ),
  },
  {
    path: '/end-customers/checkout',
    element: <EndCustomersCheckoutPage />
  },
  {
    path: '/end-customers/orders',
    element: <EndCustomersOrdersPage />
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
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseProfilePage />
          </Suspense>
        )
      },
      {
        path: 'call-for-tenders',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseCallForTendersPage />
          </Suspense>
        )
      },
      {
        path: 'candidatures',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseCandidaturesPage />
          </Suspense>
        )
      },
      {
        path: 'entretiens',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseEntretiensPage />
          </Suspense>
        )
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseProductsPage />
          </Suspense>
        )
      },
      {
        path: 'contrats',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EntrepriseContratsPage />
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

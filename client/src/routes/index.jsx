import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Lazy loaded pages
const Home = lazy(() => import('../pages/public/Home'));
const Designs = lazy(() => import('../pages/public/Designs'));
const DesignDetail = lazy(() => import('../pages/public/DesignDetail'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Login = lazy(() => import('../pages/admin/Login'));
const DesignsManagement = lazy(() => import('../pages/admin/DesignsManagement'));
const Services = lazy(() => import('../pages/public/Services'));
const ServiceDetail = lazy(() => import('../pages/public/ServiceDetail'));
const ServicesManagement = lazy(() => import('../pages/admin/ServicesManagement'));
const Work = lazy(() => import('../pages/public/Work'));
const WorkManagement = lazy(() => import('../pages/admin/WorkManagement'));
const Contact = lazy(() => import('../pages/public/Contact'));
const About = lazy(() => import('../pages/public/About'));
const CustomRequest = lazy(() => import('../pages/public/CustomRequest'));
const Terms = lazy(() => import('../pages/public/Terms'));
const PrivacyPolicy = lazy(() => import('../pages/public/PrivacyPolicy'));
const EnquiriesManagement = lazy(() => import('../pages/admin/EnquiriesManagement'));
const CustomRequestsManagement = lazy(() => import('../pages/admin/CustomRequestsManagement'));
const Settings = lazy(() => import('../pages/admin/Settings'));

const PublicLogin = lazy(() => import('../pages/public/Login'));
const PublicRegister = lazy(() => import('../pages/public/Register'));
const Account = lazy(() => import('../pages/public/Account'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<PageLoader />}><Home /></Suspense>,
      },
      {
        path: 'designs',
        element: <Suspense fallback={<PageLoader />}><Designs /></Suspense>,
      },
      {
        path: 'designs/:id',
        element: <Suspense fallback={<PageLoader />}><DesignDetail /></Suspense>,
      },
      {
        path: 'services',
        element: <Suspense fallback={<PageLoader />}><Services /></Suspense>,
      },
      {
        path: 'services/:slug',
        element: <Suspense fallback={<PageLoader />}><ServiceDetail /></Suspense>,
      },
      {
        path: 'work',
        element: <Suspense fallback={<PageLoader />}><Work /></Suspense>,
      },
      {
        path: 'contact',
        element: <Suspense fallback={<PageLoader />}><Contact /></Suspense>,
      },
      {
        path: 'about',
        element: <Suspense fallback={<PageLoader />}><About /></Suspense>,
      },
      {
        path: 'custom',
        element: <Suspense fallback={<PageLoader />}><CustomRequest /></Suspense>,
      },
      {
        path: 'terms',
        element: <Suspense fallback={<PageLoader />}><Terms /></Suspense>,
      },
      {
        path: 'privacy',
        element: <Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>,
      },
      {
        path: 'login',
        element: <Suspense fallback={<PageLoader />}><PublicLogin /></Suspense>,
      },
      {
        path: 'register',
        element: <Suspense fallback={<PageLoader />}><PublicRegister /></Suspense>,
      },
      {
        path: 'account',
        element: <Suspense fallback={<PageLoader />}><Account /></Suspense>,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <Suspense fallback={<PageLoader />}><Login /></Suspense>,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense>,
      },
      {
        path: 'designs',
        element: <Suspense fallback={<PageLoader />}><DesignsManagement /></Suspense>,
      },
      {
        path: 'services',
        element: <Suspense fallback={<PageLoader />}><ServicesManagement /></Suspense>,
      },
      {
        path: 'work',
        element: <Suspense fallback={<PageLoader />}><WorkManagement /></Suspense>,
      },
      {
        path: 'enquiries',
        element: <Suspense fallback={<PageLoader />}><EnquiriesManagement /></Suspense>,
      },
      {
        path: 'custom-requests',
        element: <Suspense fallback={<PageLoader />}><CustomRequestsManagement /></Suspense>,
      },
      {
        path: 'settings',
        element: <Suspense fallback={<PageLoader />}><Settings /></Suspense>,
      },
    ],
  },
]);

export default router;

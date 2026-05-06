import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from './App'
import { LoadingIndicator } from './components/ui/loading-indicator'

// Lazy load всех admin компонентов (map named exports to default where needed)
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })))
const LoginPage = lazy(() => import('./pages/admin/LoginPage').then(m => ({ default: m.LoginPage })))
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })))
const HallsPage = lazy(() => import('./pages/admin/HallsPage').then(m => ({ default: m.HallsPage })))
const PackagesPage = lazy(() => import('./pages/admin/PackagesPage').then(m => ({ default: m.PackagesPage })))
const ServicesPage = lazy(() => import('./pages/admin/ServicesPage').then(m => ({ default: m.ServicesPage })))
const BookingsPage = lazy(() => import('./pages/admin/BookingsPage').then(m => ({ default: m.BookingsPage })))
const ReviewsPage = lazy(() => import('./pages/admin/ReviewsPage').then(m => ({ default: m.ReviewsPage })))
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage').then(m => ({ default: m.SettingsPage })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<LoadingIndicator />}>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'halls',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <HallsPage />
          </Suspense>
        ),
      },
      {
        path: 'packages',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <PackagesPage />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: 'bookings',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <BookingsPage />
          </Suspense>
        ),
      },
      {
        path: 'reviews',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ReviewsPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
])

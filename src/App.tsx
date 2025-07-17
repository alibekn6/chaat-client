import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './pages/landing/header'
import { Footer } from './pages/landing/footer'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { ScrollToTop } from './components/ScrollToTop'
import { lazy, Suspense } from 'react'

// Lazy loading для всех страниц
const LandingPage = lazy(() => import('./pages/landing/LandingPage').then(module => ({ default: module.LandingPage })))
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(module => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(module => ({ default: module.RegisterPage })))
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage').then(module => ({ default: module.VerifyEmailPage })))
const DashboardHomePage = lazy(() => import('./pages/dashboard/DashboardHomePage').then(module => ({ default: module.DashboardHomePage })))
const AgentDetailLayout = lazy(() => import('./pages/dashboard/AgentDetailLayout').then(module => ({ default: module.AgentDetailLayout })))
const GoogleOAuthCallbackPage = lazy(() => import('./pages/auth/GoogleOAuthCallbackPage').then(module => ({ default: module.GoogleOAuthCallbackPage })));

// Loading компонент
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-20">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/google/callback" element={<GoogleOAuthCallbackPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardHomePage />} />
              <Route path="/dashboard/:botId" element={<AgentDetailLayout />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function Root() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/dashboard' : '/landing'} replace />
}

export default App

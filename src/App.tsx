import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './pages/landing/header'
import { LandingPage } from './pages/landing/LandingPage'
import { Footer } from './pages/landing/footer'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { DashboardHomePage } from './pages/dashboard/DashboardHomePage'
import { AgentDetailLayout } from './pages/dashboard/AgentDetailLayout'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardHomePage />} />
            <Route path="/dashboard/:botId" element={<AgentDetailLayout />} />
          </Route>
        </Routes>
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

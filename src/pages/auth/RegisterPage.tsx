import { useState, type FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import { Button } from '../../components/ui/button'
import { GoogleLoginButton } from '../../components/ui/GoogleLoginButton'
import { useAuth } from '../../context/AuthContext'

export function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Basic validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters long')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await register({
        email,
        password,
        full_name: fullName,
      })
      
      setRegistrationSuccess(true)
      
    } catch (err) {
      setError('Failed to register. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state - show email verification message
  if (registrationSuccess) {
    return (
      <div className="flex justify-center items-center flex-grow mb-40 mt-20">
        <div className="p-8 bg-white shadow-md rounded-lg max-w-md">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold font-mono text-gray-900 mb-3">
              Registration Successful!
            </h2>
            <p className="text-gray-600 font-mono mb-4">
              We sent a confirmation email to:
            </p>
            <p className="font-medium font-mono text-blue-600 mb-4">
              {email}
            </p>
            <div className="bg-gray-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm font-mono text-black-700">
                📧 Check your email and click the link to activate your account.
              </p>
            </div>
            <div className="text-xs font-mono text-gray-500 mb-4">
              Didn't receive the email? Check your "Spam" folder or try registering again.
            </div>
            
            <Link 
              to="/login" 
              className="w-full inline-block bg-black text-white font-mono py-2 px-4 hover:bg-gray-700 transition-colors text-center"
            >
              Back to Login
              {/* bg-black text-white font-mono px-5 py-2 */}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Registration form
  return (
    <div className="flex justify-center items-center flex-grow mb-40 mt-20">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            minLength={2}
            disabled={isSubmitting}
            placeholder="Enter your full name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="example@email.com"
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            title="Please enter a valid email address"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            disabled={isSubmitting}
            placeholder="At least 8 characters"
            title="Password must be at least 8 characters long"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-gray-400 text-xs font-mono">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <GoogleLoginButton buttonText="Sign in with Google" />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
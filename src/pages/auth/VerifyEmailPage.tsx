import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

type VerificationState = 'loading' | 'success' | 'error' | 'no-token';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();
  
  const [state, setState] = useState<VerificationState>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setState('no-token');
      setMessage('Verification token not found in URL');
      return;
    }

    // Auto-verification on page load
    handleVerification(token);
  }, [searchParams]);

  // Countdown for redirect after success
  useEffect(() => {
    if (state === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state === 'success' && countdown === 0) {
      navigate('/dashboard');
    }
  }, [state, countdown, navigate]);

  const handleVerification = async (token: string) => {
    try {
      setState('loading');
      setMessage('Verifying your email...');

      // Debug: Log the token being sent
      console.log('🔍 Verification token from URL:', token);
      console.log('🔍 Token length:', token.length);
      console.log('🔍 Full URL:', window.location.href);

      // Add timeout via AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await verifyEmail(token);
      clearTimeout(timeoutId);

      // Save tokens and update auth context with user data
      contextLogin(response.tokens.access_token, response.tokens.refresh_token, response.user);

      setState('success');
      setMessage(response.message || 'Email verified! Redirecting...');
      
    } catch (error) {
      setState('error');
      console.error('🚨 Verification error:', error);
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unknown error occurred during verification');
      }
    }
  };

  const handleRetry = () => {
    const token = searchParams.get('token');
    if (token) {
      handleVerification(token);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  );

  // Success icon component
  const SuccessIcon = () => (
    <div className="mx-auto mb-4 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  // Error icon component
  const ErrorIcon = () => (
    <div className="mx-auto mb-4 h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
      <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );

  // Warning icon component
  const WarningIcon = () => (
    <div className="mx-auto mb-4 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
      <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start pt-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          
          {/* Loading State */}
          {state === 'loading' && (
            <div className="text-center">
              <LoadingSpinner />
              <h2 className="text-xl font-semibold font-mono text-gray-900 mb-2">
                Email Verification
              </h2>
              <p className="text-gray-600 font-mono">{message}</p>
              <div className="mt-4 text-sm font-mono text-gray-500">
                This may take a few seconds...
              </div>
            </div>
          )}

          {/* Success State */}
          {state === 'success' && (
            <div className="text-center">
              <SuccessIcon />
              <h2 className="text-xl font-semibold font-mono text-green-900 mb-2">
                Email Verified!
              </h2>
              <p className="text-gray-600 font-mono mb-4">{message}</p>
              <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                <p className="text-sm font-mono text-green-700">
                  Redirecting to dashboard in <span className="font-semibold">{countdown}</span> seconds...
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-green-600 text-white font-mono py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Go to Dashboard Now
              </button>
            </div>
          )}

          {/* Error State */}
          {state === 'error' && (
            <div className="text-center">
              <ErrorIcon />
              <h2 className="text-xl font-semibold font-mono text-red-900 mb-2">
                Verification Error
              </h2>
              <p className="text-gray-600 font-mono mb-4">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 text-white font-mono py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full bg-gray-200 text-gray-700 font-mono py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* No Token State */}
          {state === 'no-token' && (
            <div className="text-center">
              <WarningIcon />
              <h2 className="text-xl font-semibold font-mono text-yellow-900 mb-2">
                Invalid Link
              </h2>
              <p className="text-gray-600 font-mono mb-4">{message}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-sm font-mono text-yellow-700">
                  Make sure you clicked the complete link from your email.
                </p>
              </div>
              <button
                onClick={handleGoHome}
                className="w-full bg-blue-600 text-white font-mono py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
          
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-sm font-mono text-gray-500">
        <p>Having verification issues? <a href="https://t.me/internalpointer" className="text-blue-600 hover:underline">Contact support</a></p>
      </div>
    </div>
  );
} 
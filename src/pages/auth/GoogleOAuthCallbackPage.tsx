import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { googleAuth } from '../../services/authService';

export function GoogleOAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [state, setState] = useState<'loading' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setState('error');
      setMessage('No code found in URL.');
      return;
    }
    const exchangeCode = async () => {
      try {
        setState('loading');
        setMessage('Exchanging code for tokens...');
        const data = await googleAuth(code);
        login(data.access_token, data.refresh_token, data.user);
        navigate('/dashboard');
      } catch (err: unknown) {
        setState('error');
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage('Unknown error during Google login');
        }
      }
    };
    exchangeCode();
    // eslint-disable-next-line
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        {state === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Google Login</h2>
            <p className="text-gray-600">{message || 'Logging you in...'}</p>
          </>
        )}
        {state === 'error' && (
          <>
            <div className="mx-auto mb-4 h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">Google Login Error</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button onClick={() => navigate('/login')} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Back to Login</button>
          </>
        )}
      </div>
    </div>
  );
} 
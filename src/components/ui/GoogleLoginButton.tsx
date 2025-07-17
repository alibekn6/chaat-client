import { useState, useRef } from 'react'

interface GoogleLoginButtonProps {
  buttonText?: string
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  buttonText = 'Войти через Google',
}) => {
  const [loading, setLoading] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI as string

  const handleGoogleLogin = () => {
    setLoading(true)
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  return (
    <div className="w-full flex flex-col items-center my-4">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
          <g>
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.71 5.8 2.69 14.09l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"/>
            <path fill="#FBBC05" d="M10.67 28.29c-1.13-3.36-1.13-6.93 0-10.29l-7.98-6.2C.99 16.09 0 19.91 0 24c0 4.09.99 7.91 2.69 11.2l7.98-6.2z"/>
            <path fill="#EA4335" d="M24 48c6.13 0 11.64-2.03 15.54-5.51l-7.19-5.59c-2.01 1.35-4.6 2.16-7.35 2.16-6.38 0-11.87-3.59-14.33-8.79l-7.98 6.2C6.71 42.2 14.82 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </g>
        </svg>
        {loading ? 'Signing in...' : buttonText}
      </button>
    </div>
  )
} 
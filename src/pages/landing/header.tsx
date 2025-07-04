import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCurrentUser } from '../../services/authService';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout, login } = useAuth();

  // Fetch user data if authenticated but no user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && !user) {
        try {
          const userData = await getCurrentUser();
          login(localStorage.getItem('token')!, localStorage.getItem('refreshToken')!, userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated, user, login]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if ((menuOpen || userDropdownOpen) && target && !target.closest('[data-menu]')) {
        setMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };

    if (menuOpen || userDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen, userDropdownOpen]);

  const links = [
    { name: 'pricing', href: '#' },
    { name: 'demo', href: 'https://youtu.be/tPVdosq1OUs' },
    { name: 'social', href: 'https://www.instagram.com/reeply.ai' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container relative mx-auto px-4 max-w-[1200px]">
        <div className="flex items-center h-16 justify-between">
          <Link to="/landing" className="text-2xl font-mono hover:opacity-80 transition-opacity">
            reeply
          </Link>

          <nav className="hidden md:flex flex-1 justify-center space-x-12">
            {links.map(({ name, href }) => (
              <a key={name} href={href} className="font-mono hover:underline text-lg">
                {name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="bg-black text-white font-mono px-5 py-2">
                  Dashboard
                </Link>
                {/* User Dropdown - Desktop Only */}
                <div className="relative" data-menu>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-mono font-medium text-gray-900">
                          {user?.full_name || 'User'}
                        </p>
                        <p className="font-mono text-sm text-gray-500">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left font-mono text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-mono text-lg hover:underline"
                >
                  sign in
                </Link>
                <Link to="/register" className="bg-black text-white font-mono px-5 py-2">
                  Try for FREE
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
            data-menu
          >
            {!menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu overlay and panel */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* semi-transparent background */}
          <div className="absolute inset-0 bg-black/40" />
          {/* menu panel */}
          <div
            className="fixed top-16 left-0 right-0 bg-white border-b border-gray-100 z-50 flex flex-col items-center py-2 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg"
            data-menu
          >
            {links.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="font-mono text-lg hover:underline px-4 py-2 w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <button
                    className="bg-black text-white font-mono px-5 py-2 w-11/12 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </button>
                </Link>
                
                {/* Mobile User Info - Text Only */}
                <div className="w-11/12 text-center">
                  <p className="font-mono font-medium text-gray-900 text-lg mb-1">
                    {user?.full_name || 'User'}
                  </p>
                  <p className="font-mono text-sm text-gray-500 mb-4">
                    {user?.email || 'user@example.com'}
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="border border-black text-black font-mono px-5 py-2 w-full rounded hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-mono text-lg hover:underline px-4 py-2 w-full text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  sign in
                </Link>
                <Link to="/register">
                  <button
                    className="bg-black text-white font-mono px-5 py-2 w-11/12 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Try for FREE
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const links = [
    { name: 'pricing', href: '#' },
    { name: 'demo', href: 'https://www.youtube.com/watch?v=vRB1MLGEHSc' },
    { name: 'social', href: '#' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container relative mx-auto px-4 max-w-[1200px]">
        <div className="flex items-center h-16 justify-between">
          <Link to="/landing" className="text-2xl font-mono hover:opacity-80 transition-opacity">
            chaat
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
              <Link to="/dashboard">
                <button className="bg-black text-white font-mono px-5 py-2">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-mono text-lg hover:underline"
                >
                  sign in
                </Link>
                <Link to="/register">
                  <button className="bg-black text-white font-mono px-5 py-2">
                    Try for FREE
                  </button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
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
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          {/* semi-transparent background */}
          <div className="absolute inset-0 bg-black/40" />
          {/* menu panel */}
          <div
            className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 flex flex-col items-center py-2 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg"
            onClick={e => e.stopPropagation()}
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
              <Link to="/dashboard">
                <button
                  className="bg-black text-white font-mono px-5 py-2 w-11/12 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </button>
              </Link>
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
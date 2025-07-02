import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Hero = () => {
  const { isAuthenticated } = useAuth()
  return (
    <section className="min-h-screen flex items-start justify-center pt-30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1
            className="
              text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold font-mono m-0 p-0 leading-none 
              text-center lg:text-left
              bg-gradient-to-r from-black via-blue-900 to-blue-700
              bg-clip-text text-transparent
              animate-gradient
            "
          >
            <span className="block">Build your</span>
            <span className="block">telegram bot —</span>
            <span className="block">in few minutes,</span>
            <span className="block">Zero Code</span>
          </h1>

          <div className="flex justify-center lg:justify-start mt-6 lg:mt-10">
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="
                font-mono text-white
                rounded-lg
                bg-gradient-to-r from-blue-900 via-blue-500 to-indigo-200
                animate-gradient
                px-8 py-3 mt-10
                transition-transform duration-300
                active:scale-95
                inline-block
              "
            >
              {isAuthenticated ? "Dashboard" : "Get started for free"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
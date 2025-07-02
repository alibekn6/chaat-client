import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { useAuth } from '../../context/AuthContext'

export function FinalCTA() {
  const { isAuthenticated } = useAuth()
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-5xl font-bold mb-6 text-gray-900">
          Make customer experience your competitive edge
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Join thousands using reeply to automate interactions, increase bookings…
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-md inline-flex items-center justify-center"
          >
            {isAuthenticated ? "Go to Dashboard" : "Start building for free"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-200">
            Talk to sales
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          Free forever plan • No credit card • 5-minute setup
        </p>
      </div>
    </section>
  )
}

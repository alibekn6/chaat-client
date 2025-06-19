import { ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function FinalCTA() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-5xl font-bold mb-6 text-gray-900">
          Make customer experience your competitive edge
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Join thousands using chaat to automate interactions, increase bookings…
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            Start building for free<ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
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

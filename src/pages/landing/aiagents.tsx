import { Card, CardContent } from '../../components/ui/card'
import { Headphones, TrendingUp, Calendar } from 'lucide-react'
import { Badge } from '../../components/ui/badge'

export function AIAgents() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gray-100 text-gray-700 border-0 mb-10">AI-Driven Agents</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock the power of AI-driven Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deploy specialized AI agents that handle different aspects…
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              Icon: Headphones,
              title: 'Support Agent',
              gradient: 'from-gray-700 to-gray-900',
              quote: `"How can I help you today?"`,
            },
            {
              Icon: TrendingUp,
              title: 'Sales Agent',
              gradient: 'from-gray-700 to-gray-800',
              quote: `"I recommend our Pro plan."`,
            },
            {
              Icon: Calendar,
              title: 'Booking Agent',
              gradient: 'from-gray-700 to-gray-800',
              quote: `"I've found 3 slots Which time ?"`,
            },
          ].map(({ Icon, title, gradient, quote }) => (
            <Card key={title} className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-0">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm mb-4">{title} description…</p>
                <div className={`bg-gradient-to-r ${gradient} text-white rounded-lg p-3 text-xs`}>
                  {quote}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

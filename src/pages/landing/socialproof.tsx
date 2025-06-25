import { Star } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'

export function SocialProof() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What people say</h2>
          <p className="text-xl text-gray-600">Trusted by thousands of businesses worldwide</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: 'Sarah Johnson',
              role: 'CEO, TechStart',
              avatar: 'SJ',
              quote: "reeply transformed our customer service…",
              gradient: 'from-blue-950 via-blue-800 to-blue-600',
            },
            {
              name: 'Mike Chen',
              role: 'Founder, BookSmart',
              avatar: 'MC',
              quote: "Saved us 20 hours per week…",
              gradient: 'from-blue-900 via-blue-700 to-blue-500',
            },
            {
              name: 'Anna Rodriguez',
              role: 'Marketing Director',
              avatar: 'AR',
              quote: "First bot running in under 10 minutes…",
              gradient: 'from-blue-800 via-blue-600 to-blue-400',
            },
          ].map(({ name, role, avatar, quote, gradient }) => (
            <Card key={name} className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
              <CardContent className="p-0">
                <div className="flex items-center mb-4 space-x-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gray-700 text-gray-700" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{quote}"</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mr-3`}>
                    <span className="text-white font-semibold text-sm">{avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{name}</div>
                    <div className="text-sm text-gray-500">{role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            ['9000+','Active Bots'],
            ['140+','Countries'],
            ['99.9%','Uptime'],
          ].map(([stat,label]) => (
            <div key={label}>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

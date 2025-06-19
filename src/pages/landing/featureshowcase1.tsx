import { Badge } from '../../components/ui/badge'
import { CheckCircle } from 'lucide-react'

export function FeatureShowcase1() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Badge className="bg-gray-100 text-gray-700 border-0">Conversational AI</Badge>
            <h2 className="text-4xl font-bold text-gray-900">
              An end-to-end solution for conversational AI
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform customer interactions with intelligent bots that…
            </p>

            {[
              ['Natural language processing', 'Understands customer intent…'],
              ['Context awareness',           'Remembers conversation history…'],
              ['Multi-language support',     'Communicate in any language.'],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{title}</h4>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-xl border p-8">
              <div className="space-y-4">
                {/* Replace these with your ChatMockup or static messages */}
                <div className="bg-gray-100 rounded-2xl p-4 max-w-xs">
                  <p className="text-sm text-gray-700">Hi! I'm looking for pricing…</p>
                </div>
                <div className="bg-black text-white rounded-2xl p-4 max-w-xs ml-auto">
                  <p className="text-sm">I'd be happy to help! What service…</p>
                </div>
                {/* …more bubbles */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

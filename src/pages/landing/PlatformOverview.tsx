import { Card, CardContent } from '../../components/ui/card'
import { Bot, Sparkles, Shield } from 'lucide-react'

export function PlatformOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The complete platform for Telegram automation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, deploy, and manage intelligent Telegram bots that grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: Bot, title: 'Smart bot builder', desc: 'Visual drag-and-drop interface', gradient: 'from-blue-500 to-blue-900' },
            { Icon: Sparkles, title: 'AI-powered responses', desc: 'Advanced AI understands context', gradient: 'from-blue-400 to-emerald-500' },
            { Icon: Shield, title: 'Enterprise security', desc: 'Bank-grade encryption & compliance', gradient: 'from-green-400 to-emerald-500' },
          ].map(({ Icon, title, desc, gradient }) => (
            <Card key={title} className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-0 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

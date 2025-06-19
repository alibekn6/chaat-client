import { Badge } from '../../components/ui/badge'
import { Calendar, FileText, BarChart3 } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function FeatureShowcase2() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <Badge className="bg-green-100 text-green-700 border-0">Smart Integrations</Badge>
            <h2 className="text-4xl font-bold text-gray-900">
              Works like the best customer service agents
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Seamlessly integrate with Google Sheets, calendars, payments…
            </p>

            {[
              { Icon: Calendar, title: 'Automated scheduling',    desc: 'Sync with Google Calendar…' },
              { Icon: FileText, title: 'Sheets integration',     desc: 'Store & manage data…'        },
              { Icon: BarChart3, title: 'Analytics & insights',  desc: 'Track performance…'           },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{title}</h4>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative order-1 lg:order-2">
            {/* You can embed a mini booking UI here */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              <div className="mb-4 flex justify-between">
                <span>Available Slots</span>
                <span className="text-xs text-green-600">● Online</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['10:00 AM','2:00 PM','4:00 PM','6:00 PM'].map(slot => (
                  <button
                    key={slot}
                    className={`p-2 text-sm rounded-lg ${
                      slot === '4:00 PM'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <Button className="w-full bg-gray-900 text-white">Confirm Booking</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

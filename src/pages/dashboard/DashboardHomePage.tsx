import { Link } from 'react-router-dom'
import { agents } from './mock'

export function DashboardHomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-20">Your AI Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Link
            to={`/dashboard/${agent.id}`}
            key={agent.id}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {agent.name}
            </h5>
            <p className="font-normal text-gray-700">{agent.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
} 
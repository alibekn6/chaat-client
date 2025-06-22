import {
  useParams,
  Outlet,
  NavLink,
  Navigate,
} from 'react-router-dom'
import { agents } from './mock'

export function AgentDetailLayout() {
  const { agentId } = useParams<{ agentId: string }>()
  const agent = agents.find((a) => a.id === agentId)

  if (!agent) {
    return <Navigate to="/dashboard" replace />
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
      <p className="text-gray-600 mb-6">{agent.description}</p>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <NavLink to={`/dashboard/${agentId}/text`} className={navLinkClasses}>
            Text
          </NavLink>
          <NavLink to={`/dashboard/${agentId}/qa`} className={navLinkClasses}>
            Q&A
          </NavLink>
        </nav>
      </div>

      <div className="py-6">
        <Outlet />
      </div>
    </div>
  )
} 
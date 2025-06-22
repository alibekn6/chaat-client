import { useParams, Navigate } from 'react-router-dom'
import { agents } from './mock'

export function TextPage() {
  const { agentId } = useParams<{ agentId: string }>()
  const agent = agents.find((a) => a.id === agentId)

  if (!agent) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Business Information</h2>
      <p className="text-gray-700 whitespace-pre-line">{agent.businessInfo}</p>
    </div>
  )
} 
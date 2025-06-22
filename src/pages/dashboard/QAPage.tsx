import { useState, type FormEvent } from 'react'

interface QAPair {
  id: number
  question: string
  answer: string
}

export function QAPage() {
  const [title, setTitle] = useState('')
  const [qaPairs, setQAPairs] = useState<QAPair[]>([
    { id: 1, question: '', answer: '' },
  ])

  const handleAddPair = () => {
    setQAPairs([...qaPairs, { id: Date.now(), question: '', answer: '' }])
  }

  const handleRemovePair = (id: number) => {
    setQAPairs(qaPairs.filter((pair) => pair.id !== id))
  }

  const handlePairChange = (
    id: number,
    field: 'question' | 'answer',
    value: string,
  ) => {
    setQAPairs(
      qaPairs.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair,
      ),
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log({ title, qaPairs })
    alert('Q&A Submitted! Check the console for the data.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Create a New Q&A Set</h2>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Shipping Information"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {qaPairs.map((pair, index) => (
        <div key={pair.id} className="bg-white p-6 rounded-lg shadow-sm relative">
          <h3 className="text-lg font-medium mb-4">Q&A Pair #{index + 1}</h3>
          {qaPairs.length > 1 && (
             <button
                type="button"
                onClick={() => handleRemovePair(pair.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
              &times;
            </button>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor={`question-${pair.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <input
                type="text"
                id={`question-${pair.id}`}
                value={pair.question}
                onChange={(e) =>
                  handlePairChange(pair.id, 'question', e.target.value)
                }
                placeholder="e.g., What are the shipping costs?"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor={`answer-${pair.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Answer
              </label>
              <textarea
                id={`answer-${pair.id}`}
                value={pair.answer}
                onChange={(e) =>
                  handlePairChange(pair.id, 'answer', e.target.value)
                }
                rows={3}
                placeholder="e.g., Standard shipping is $5. Free shipping for orders over $50."
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleAddPair}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Another Q&A
        </button>

        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Q&A Set
        </button>
      </div>
    </form>
  )
} 
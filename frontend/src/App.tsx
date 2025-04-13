import { useState } from 'react'
import Counter from './challenges/01-counter'
import AnotherChallenge from './challenges/02-another'

const componentMap = {
  'counter': Counter,
  'another': AnotherChallenge
}

type ChallengeKey = keyof typeof componentMap;

function App() {
  const [currentChallengeKey, setCurrentChallengeKey] = useState<ChallengeKey>('counter');

  // Get the component type based on the key
  const ComponentToRender = componentMap[currentChallengeKey];

  return (
    <div className="container mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">React Challenge Viewer</h1>

      <div className="mb-6 flex items-center justify-center space-x-3">
        <label htmlFor="challenge-select" className="font-semibold text-lg">Select Challenge:</label>
        <select
          id="challenge-select"
          value={currentChallengeKey}
          onChange={e => setCurrentChallengeKey(e.target.value as ChallengeKey)}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.keys(componentMap).map((key) => (
            <option key={key} value={key}>{key}</option> 
          ))}
        </select>
      </div>

      <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
        {ComponentToRender ? <ComponentToRender /> : <p className="text-gray-500">Select a challenge to view.</p>}
      </div>
    </div>
  )
}

export default App

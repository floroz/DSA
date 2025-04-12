/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ChallengeRenderer from "./ChallengeRenderer"; // Import the new renderer component

// --- Manual Imports ---
// Import your challenge components here using the '@' alias (omit the extension)
import Counter from "@/react-challenges/01-Counter";
// import AnotherComponent from '@/react-challenges/02-Another/index';

// --- Challenge Map ---
// Map challenge names (used in UI) to the imported component references
const availableChallenges: Record<string, React.ComponentType<any>> = {
  "01-Counter": Counter,
  // '02-Another': AnotherComponent,
};

// Get the names for the UI list
const challengeNames = Object.keys(availableChallenges);
// --- End Manual Setup ---

function App() {
  // Only need state for the selected challenge name
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null
  );

  // Determine the component to render directly based on state
  const ComponentToShow = selectedChallenge
    ? availableChallenges[selectedChallenge] || null
    : null;

  const handleSelectChallenge = (challengeName: string) => {
    setSelectedChallenge(challengeName);
  };

  return (
    // Add padding to the main container
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">React Challenge Viewer</h1>
      <nav className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select a Challenge:</h2>
        {challengeNames.length > 0 ? (
          // Remove default list styling
          <ul className="list-none p-0">
            {challengeNames.map((name) => (
              // Add margin to list items
              <li key={name} className="mb-1">
                {/* Style the link */}
                <a
                  onClick={() => handleSelectChallenge(name)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No manually imported challenges found.</p>
        )}
      </nav>

      {/* Style the component container */}
      <div className="mt-5 p-4 border border-gray-300 rounded">
        {/* Always render ChallengeRenderer, passing the determined component type */}
        <ChallengeRenderer SelectedComponent={ComponentToShow} />
      </div>
    </div>
  );
}

export default App;

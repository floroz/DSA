import React from "react";

interface ChallengeRendererProps {
  // Allow any component type that accepts any props
  SelectedComponent: React.ComponentType<unknown> | null;
}

function ChallengeRenderer({ SelectedComponent }: ChallengeRendererProps) {
  if (!SelectedComponent) {
    return <p>Select a challenge from the list above to view it here.</p>;
  }

  // Render the component passed as a prop
  return <SelectedComponent />;
}

export default ChallengeRenderer;

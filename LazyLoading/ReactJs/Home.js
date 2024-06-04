// MainComponent.js
import React, { Suspense, useState } from 'react';

// Lazy loading HeavyComponent
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

const MainComponent = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <h1>Welcome to Lazy Loading in React.js</h1>
      <button onClick={() => setShowComponent(true)}>Load Heavy Component</button>
      <Suspense fallback={<div>Loading...</div>}>
        {showComponent && <HeavyComponent />}
      </Suspense>
    </div>
  );
};

export default MainComponent;

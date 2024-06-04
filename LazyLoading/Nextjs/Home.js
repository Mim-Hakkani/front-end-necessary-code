// pages/index.js
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the HeavyComponent
const Component1 = dynamic(() => import('./Component1'), {
  loading: () => <p>Loading...</p>, // Optional: A fallback component to display while loading
  ssr: false, // Optionally disable SSR if the component is client-side only
});

const Component2 = dynamic(() => import('./Component2'), {
    loading: () => <p>Loading...</p>, // Optional: A fallback component to display while loading
    ssr: false, // Optionally disable SSR if the component is client-side only
  });

const Home = () => {
  const [showComponent, setShowComponent] = React.useState(false);
  const [showComponent2, setShowComponent2] = React.useState(false);

  return (
    <div>
      <h1>Welcome to Next.js</h1>

      <button onClick={() =>{ setShowComponent(true)
setShowComponent2(true)}

      }>Load Heavy Component</button>


      {showComponent && <Component1 />}
      {showComponent2 && <Component2 />}


    </div>
  );
};

export default Home;

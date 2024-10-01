/*
  if click button the open a box/modal/paper and click outside the box then close the box/modal/paper 
*/


import React, { useState, useEffect, useRef } from 'react';

const ToggleCampaign = () => {
  const [onOffCampagion, setOnOffCampagion] = useState(false);
  const buttonRef = useRef(null); // Ref for the button

  const handleOnOffCampagion = () => {
    setOnOffCampagion(!onOffCampagion); // Toggle the state when clicking the button
  };

  // Effect to handle clicks outside of the button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setOnOffCampagion(false); // Set to false if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
    };
  }, []);

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleOnOffCampagion}
        style={{
          backgroundColor: onOffCampagion ? 'green' : 'red',
          color: '#fff',
          padding: '10px 20px',
        }}
      >
        {onOffCampagion ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default ToggleCampaign;


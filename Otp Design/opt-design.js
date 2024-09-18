import React, { useRef } from 'react';
import { Box } from '@mui/material';

const OTPInput = () => {
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus(); // Move to the next input
    }
    if (value.length === 1 && index === inputsRef.current.length - 1) {
      inputsRef.current[index].blur(); // Remove focus after last digit
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus(); // Move to the previous input on backspace
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    }}>
      {Array(6).fill('').map((_, index) => (
        <input
          key={index}
          maxLength={1}
          style={{
            borderRadius: '10px',
            border: '1px solid #CCD1EC',
            height: '50px',
            width: '50px',
            textAlign: 'center',
            outline: 0,
            fontSize: '20px',
            color: '#2b2b2b',
          }}
          ref={(el) => (inputsRef.current[index] = el)} // Store input reference
          onChange={(e) => handleInputChange(e, index)} // Handle input change
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace navigation
        />
      ))}
    </Box>
  );
};

export default OTPInput;


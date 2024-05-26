<TextField sx={{ input: { cursor: 'not-allowed' } }}/> 

// disable icon , show .. uisng this code in mui then all cursor is working 



if button disable and also cursor is not-allowed then 
              <Button
  disabled={selectedReason === "Select A Reason" || !selectedReason}
  sx={{
    background:
      "linear-gradient(266.33deg, #0D92BE -0.31%, rgba(13, 146, 190, 0.77) 99.69%)",
    width: '50%',
    borderRadius: '4px',
    textTransform: 'capitalize',
    fontFamily: 'Inter',
    padding: '5px 5px',
    fontWeight: 400,
    color: '#fff',
    cursor: selectedReason === "Select A Reason" || !selectedReason ? 'not-allowed' : 'pointer',

    '&.Mui-disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'auto', // Ensure the cursor style is respected even when disabled
    }
  }}
  onClick={handleCreateObjection}
>
  Objection Now
</Button>


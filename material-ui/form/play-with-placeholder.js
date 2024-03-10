<TextField
size='small'
{...register('code')}  // here is the hook form code 
placeholder='Company Code'
sx={{
    width: '60%',
    backgroundColor:'#fff',

    // here is the material ui placeholder edit code 
    '& input::placeholder': {  
        fontFamily:'Times New Roman',
        fontSize:'17px' 
      },
      
      // default value styles 
      
        '& input': {
						color: 'red',
						fontSize:'14px',
						color:'#2b2b2b'
					}

}}
/>


           "& fieldset": { border: 'none' },

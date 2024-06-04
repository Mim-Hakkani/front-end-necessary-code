
 // functionality of jsx code 

 const [copySuccessRef2, setCopySuccessRef2] = useState(false);

 const handleLinkClick = (ref, setCopySuccess) => {
   navigator.clipboard.writeText(`localhost:3000/register/registration?ref=${ref}`)
     .then(() => {
       setCopySuccess(true);
       setTimeout(() => {
         setCopySuccess(false);
       }, 2000); // Tooltip will be visible for 2 seconds
     })
     .catch((err) => {
       console.error('Failed to copy: ', err);
     });
 };
 
 
 
 //jsx  code 
 
    <Tooltip title="Copied!" open={copySuccessRef2} arrow>
            <span
              style={{ color: 'blue', fontSize: '12px', cursor: 'pointer' }}
              onClick={() => handleLinkClick(ConsumerDetails?.selfConsumer?.rightRefer, setCopySuccessRef2)}
            >
              [Link]
            </span>
    </Tooltip>

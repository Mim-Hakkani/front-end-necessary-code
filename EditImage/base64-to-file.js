  function base64ToFile(base64String, fileName) {
    try {
      // Ensure base64String is valid
      if (!base64String || !base64String.includes(',')) {
        throw new Error('Invalid base64 string');
      }
  
      // Remove the Base64 prefix (data:image/jpeg;base64,)
      const base64Data = base64String.split(',')[1];
  
      // Use Buffer to handle decoding in Node.js (Next.js) environments
      let byteArray;
      if (typeof window === 'undefined') {
        // Server-side decoding using Buffer
        byteArray = Buffer.from(base64Data, 'base64');
      } else {
        // Client-side decoding using atob()
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        byteArray = new Uint8Array(byteNumbers);
      }
  
      // Get MIME type from the Base64 string
      const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
  
      // Create a Blob with the binary data and the MIME type
      const blob = new Blob([byteArray], { type: mimeType });
  
      // Create a File object from the Blob
      return new File([blob], fileName, { type: mimeType });
    } catch (error) {
      console.error('Error converting base64 to file:', error.message);
      return null;
    }
  }


  useEffect(() => {
    if (filteredImage) {
      const filterFile = base64ToFile(filteredImage, 'filter-image.jpg');
      if (filterFile) {
        // console.log("files is ", filterFile);
        setImagePreview(filterFile); // Use object URL to display the file
      }
    }
  }, [filteredImage]);

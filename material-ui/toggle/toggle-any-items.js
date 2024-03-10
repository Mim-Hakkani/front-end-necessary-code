    state items 
    
    const [toggle, setToggle] = useState(false);
	const [fileName, setFileName] = useState('');
	
	
	
    
    // is show delete/download or is show fileImage
	const handleToggleDeleteOrDownload = (id) => {

		if (toggle === id) {
            // If the clicked item is already open, close it
            setToggle(null);
        } else {
            // If a different item is clicked, close the currently open one and open the clicked item
            setToggle(id);
            setFileName(id);
        }

	};
	
	
	
	/********************* typography  ***************************/
	
		<p onClick={
					()=>handleToggleDeleteOrDownload(fileObj?.node?.id)
				}>
				
				click 
		</p>

/* if not using required then i want after submit to the required page then  */


     // inside the submit function 
    
       if (ShopcountryRef.current) {
				ShopcountryRef.current.scrollIntoView({ behavior: 'smooth' });
			  }
			  
	// use state 
	
	  const ShopcountryRef = useRef(null);
	  
	  
    // in the ui form 

	<input ref={ShopcontinentRef}></input>  // this section i want to goo 

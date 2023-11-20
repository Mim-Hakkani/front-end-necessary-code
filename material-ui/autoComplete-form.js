import React from 'react';

const autoCompleteForm = () => {

    /*****************  functionalities   **************************/


const handleClose = () => {
    setDialogValue({
      name: ''
    });
    toggleOpen(false);
  };



  const handleSubmitComCat = (event) => {
    event.preventDefault();

	productCompanyCategoryMutation({
		variables:{
			name: dialogValue.name
		},

		context: {
			headers: {
				Authorization: `JWT ${token}`,
			},
		},
		onCompleted:()=>{		
			handleClose();
		}
	})
    	
  };


    return (
        <div>
            <Autocomplete
												size='small'
												
										value={value}
										onChange={(event, newValue) => {


										if (typeof newValue === 'string') {
                                            console.log("new0",newValue)
											toggleOpen(true);
											setDialogValue({
											name: newValue
											
											});

										} else if (newValue && newValue.inputValue) {
										
											toggleOpen(true);
											setDialogValue({
                                               
											

											name: newValue.inputValue
											
											});
										} else {
											setCompanyCategoryId(newValue?.id)
											setValue(newValue);
										}
										}}
										filterOptions={(options, params) => {
										const filtered = filter(options, params);

										if (params.inputValue !== '') {
											filtered.push({
											inputValue: params.inputValue,
											name: `Add "${params.inputValue}"`,
											});
										}

										return filtered;
										}}
										id="free-solo-dialog-demo"
										options={companyCategoryLists?.productCompanyCategories?.edges.map((dos) => dos.node)}
										getOptionLabel={(option) => {

										if (typeof option === 'string') {
											return option;
										}
										if (option.inputValue) {
											return option.inputValue;
										}
										return option.name;
										}}
										selectOnFocus
										clearOnBlur
										handleHomeEndKeys
										renderOption={(props, option) => <li {...props}>{option.name}</li>}
										sx={{ width: "60%",backgroundColor:'#fff' }}
										freeSolo
										renderInput={(params) => <TextField 
											placeholder='select or add company category'
											sx={{
												".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":{
													p:"0px!important",
												},
												'& input::placeholder': {  
													fontFamily:'Times New Roman',
													fontSize:'17px' 
												  },


												
											}}
										
											{...params}  />}
									/>
								<Dialog open={open} onClose={handleClose}>
								
									<DialogTitle>Add New Company Category</DialogTitle>
									<DialogContent>
									
										<TextField
											size='small'
										autoFocus
										margin="dense"
										id="name"
										value={dialogValue.name}
										onChange={(event) =>
											setDialogValue({
											...dialogValue,
											name: event.target.value,
											})
										}
										label="Company Category"
										type="text"
										variant="standard"
										/>
									
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose}>Cancel</Button>
										<Button onClick={handleSubmitComCat}>Add</Button>
									</DialogActions>
								
								</Dialog>
        </div>
    );
};

export default autoCompleteForm;
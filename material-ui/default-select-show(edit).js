
const [bankBranchName, setBankBranchName] = useState('');

// allBranchData is the api comes from graphql 

const {
    data: allBranchData,
    loading: allBranchLoading,
    error: allBranchError,
} = useQuery(ALL_BRANCH, {
    variables: {
        id: bankId,
    },
});

// find the single Braanch name  to show data 

const BranchName = allBranchData?.bankBranches?.edges.find(item=>item?.node?.id===branchId)  // required 


// step 2 => using useEffect to Show 

useEffect(()=>{
    setBankBranchId(accountData?.bankAccount?.bankBranch?.id);
},[!loading])


// step 3 => paste the select component  
<FormControl sx={{ width: '373px' }} size='small'>
	<Select
		labelId='demo-select-small'
		id='demo-select-large'
		name='branchName'
		displayEmpty 
		value={branchId}
		renderValue={(value) =>
			value !== '' ? (
				BranchName?.node?.name
			) : (
				<Typography
					sx={{
						color: '#a1a1a1',
						fontSize: '13px',
					}}>
					Branch Name
				</Typography>
			)
		}
		onChange={(e) => setBankBranchId(e.target.value)}>
		{allBranchData?.bankBranches?.edges?.map((branch) => (
			<MenuItem value={branch?.node?.id}>{branch?.node?.name}</MenuItem>
		))}
	</Select>
</FormControl>;



/************************* select er choddoo gustiiii ********************************/
   const [designation, setDesignation] = useState('Enter designation');

	<Select
						labelId='demo-select-small'
						id='demo-select-large'
					    value={designation}
						size='small'
						fullWidth
						required
						name='designation' 			
						IconComponent={KeyboardArrowDownIcon}
						onChange={(e) => setDesignation(e.target.value)}
						renderValue={(value) => (value ? value : 'Select Blood Group')}
						sx={{
							fontSize: '14px',
							color:designation!=="Enter designation" ? "#2b2b2b" : "#9D9D9D"
						}}

						MenuProps={{ // This ensures the menu opens when clicking the icon
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
							getContentAnchorEl: null,
						}}


						>
					
						<MenuItem value='A+'>A+</MenuItem>
						<MenuItem value='AB+'>AB+</MenuItem>
						<MenuItem value='B+'>B+</MenuItem>
						<MenuItem value='O+'>O+</MenuItem>
						<MenuItem value='A-'>A-</MenuItem>
						<MenuItem value='B-'>B-</MenuItem>
						<MenuItem value='O-'>O-</MenuItem>
					</Select>

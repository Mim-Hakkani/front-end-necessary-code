
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

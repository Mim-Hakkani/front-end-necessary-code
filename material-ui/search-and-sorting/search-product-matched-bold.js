	// which page example 

	// 1. ims company search
	// 2. product search 
	// 3. affiliate search 

	// component page table 
	const tableData = stableSort(tableDatas, getComparator(order, orderBy))
		?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		.map((row, index) => {

			const labelId = `enhanced-table-checkbox-${index}`;
			const title = row.node.name || row.node.companyType ;
			const searchTextLower = searchText.toLowerCase();
			const regex = new RegExp(searchTextLower, "ig");

			const highlightMatches = (text) => {
				const matches = text?.match(regex);
				if (!matches) {
				  return text; // Return the text as it is if no matches found
				}
			  
				const parts = text?.split(regex);
			  
				return (
				  <span>
					{parts.map((part, i) => (
					  <span key={i}>
						{part}
						{matches[i] ? <b>{matches[i]}</b> : null}
					  </span>
					))}
				  </span>
				);
			  };
			  
			return (
				<TableRow
					hover={true}
					tabIndex={-1}
					key={row.node.id}
					// className='rowHover'
					// style={{
					// 	backgroundColor: selectedRow === row.node.id ? '#c7c7cd9e' : '',
					// }}
					// onClick={() => setSelectedRow(row.node.id)}

					style={{
						backgroundColor: selectedRow === row.node.id ? '#c7c7cd9e' : '',
						cursor: 'pointer',
					}}
					onClick={() =>
						setSelectedRow((prevSelectedRow) =>
							prevSelectedRow === row.node.id ? null : row.node.id
						)
					}>
					<TableCell
						className='tableBorder'
						id={labelId}
						component='th'
						scope='row'
						align='center'>
						{highlightMatches(row.node.code)}
					</TableCell>
					<TableCell className='tableBorder' align='center'>
			         {highlightMatches(row.node.name)}
					</TableCell>
					<TableCell className='tableBorder' align='center'>
					{highlightMatches(row.node.companyType)}
					</TableCell>
				
				</TableRow>
			);
		});



		// search api 

		const { data, loading, error, fetchMore } = useQuery(ALL_COMPANY, {
			variables: { after: null, first: 16, search: searchText },
			context: {
				headers: {
					Authorization: `JWT ${token}`,
				},
			},
			fetchPolicy: 'network-only',
		});

		// state 

		const [searchText, setSearchText] = useState('');


		// compoent 


		<div style={{ marginTop: '10px' }} className='searchSection'>
		<div className='searchInput'>
			<InputBase
				size='small'
				variant='outlined'
				fullWidth
				placeholder='Search by company or category name...'
				onChange={(e) => setSearchText(e.target.value)}
				value={searchText}
			/>
			{searchText && (
				<ClearIcon
					className='clearIcon'
					onClick={searchTextHandler}
				/>
			)}
		</div>
	</div>
	

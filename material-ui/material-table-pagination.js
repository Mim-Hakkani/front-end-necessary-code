	// company details
	const { data, loading, error, fetchMore } = useQuery(ALL_COMPANY, {
		variables: { after: null, first: 16, search: searchText },
		context: {
			headers: {
				Authorization: `JWT ${token}`,
			},
		},
		fetchPolicy: 'network-only',
	});

	const handleChangePage = (event, newPage) => {
		const length = (data?.companies?.edges).length;
		const pageData = newPage * 15;
		setPage(newPage);
		if (newPage && pageData === length - 1) {
			setFetchMoreLoading(true);
			dataLoadHandler(15);
		}
	};

	const handleChangeRowsPerPage = (event) => {
		const length = (data?.companies?.edges).length;
		const rowPerPage = event.target.value;
		if (length > rowPerPage) {
			setRowsPerPage(parseInt(rowPerPage, 10));
			setPage(0);
		}
	};

	// Fetch more data when click next button
	const dataLoadHandler = (page) => {
		const { endCursor } = data?.companies?.pageInfo;
		fetchMore({
			variables: { after: endCursor, first: page },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				fetchMoreResult.companies?.edges = [
					...data?.companies?.edges,
					...fetchMoreResult?.companies?.edges,
				];

				setFetchMoreLoading(false);

				return fetchMoreResult;
			},
		});
	};


    /**************** Table componets ****************** */

    <TableContainer
    style={{
        marginTop: '10px',
        maxHeight: '290px',
        overflow: 'auto',
    }}>
    <Table aria-labelledby='tableTitle' size='small'>
        <EnhancedTableHead rowCount={tableDatas?.length} />
        <TableBody>{tableData}</TableBody>
    </Table>
</TableContainer>

<TablePagination
    rowsPerPageOptions={[10, 50, 100]}
    component='div'
    count={tableDatas?.length > 0 ? tableDatas?.length : 0}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
/>


/******************** table inside  in function  with matched selected in bold 
 * 
 * ********* */

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
					<TableCell className='tableBorder' align='center'>
						{row.node.email}
					</TableCell>
				</TableRow>
			);
		});

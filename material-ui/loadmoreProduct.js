// main api format in query 

import { gql } from '@apollo/client';

export const SEARCH_SHOP_PRODUCT = gql`
	query($shopSlug: String!, $search: String!, $first: Int, $after: String) {
		shopWiseProductSearch(
			shopSlug: $shopSlug
			search: $search

			first: $first
			after: $after
		) {
			edges {
				node {
					id

					name
					code
					slug

					productUsedStatus
					productImage

					productUnitValue
					avarageRating
					productUnit {
						id
						unitName
					}

					shop {
						id
						name
						country {
							id
							name
							currenciesSymbol
						}
					}
					variantStocks(last: 1) {
						edges {
							node {
								id
								quantity
								discount
								sellPrice
								comparePrice
								commissionPercentage
								sellPriceDolar
								comparePriceDolar
								commissionDolar
							}
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
		}
	}
`;

// api implementation in Component  ************  Step 3  ********

const { data: searchData, loading: loadingShop, fetchMore } = useQuery(
	SEARCH_SHOP_PRODUCT,
	{
		variables: {
			shopSlug: shopSlug,
			search: enterSearch,
			first: fetchCount,
		},

		context: {
			headers: {
				Authorization: `JWT ${token}`,
			},
		},

		skip: shopSlug ? false : true,
	}
);

//  react state for load more  ************  Step 1 ********

const [fetchCount, setFetchCount] = useState(5); // Number of products to fetch
const handleLoadMore = () => {
	setFetchingMore(true);
	setFetchCount(fetchCount + 5); // Increase the count for the next fetch
};

// frontend code inside the component ************  Step 2 ********

{
	loadingShop && (
		<CircularProgress
			color='inherit'
			sx={{
				textAlign: 'center',
				color: '#41b1b1',
				margin: '21px auto',
				display: 'block',
			}}
		/>
	);
}
{
	!loadingShop && searchData?.shopWiseProductSearch?.pageInfo?.hasNextPage && (
		<Button
			variant='contained'
			onClick={handleLoadMore}
			sx={{ margin: '20px auto', display: 'block' }}>
			Load More
		</Button>
	);
}

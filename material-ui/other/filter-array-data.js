
note : i have array of object theh i want to remove some key with value then use this tecnique 

const filterPurchaseProduct = purchaseProduct?.filter(item => {
	const {
		productId,
		variantStockId,
		quantity,
		marketPriceRate,
		salesRate,
		perProductDiscountPercentage
	} = item;

	return {
		productId,
		variantStockId,
		quantity,
		marketPriceRate,
		salesRate,
		perProductDiscountPercentage
	};
});

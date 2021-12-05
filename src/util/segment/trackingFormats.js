export const getTrackingProducts = (product) => ({
  product_id: product?.sku,
  sku: product?.sku,
  name: product?.name,
  category: product?.name === 'Search Ads' ? 'Search Ads' : 'Yellow Online',
  brand: product?.name === 'Search Ads' ? 'Google' : 'Yellow',
  price: product?.listPrice,
  quantity: 1,
  url: product?.url,
  image_url: product?.imageUrl,
});

export default getTrackingProducts;

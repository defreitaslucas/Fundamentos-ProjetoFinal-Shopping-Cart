const fetchItem = async (sku) => {
  // seu código aqui
  if (!sku) {
    return new Error('You must provide an url');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  return response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

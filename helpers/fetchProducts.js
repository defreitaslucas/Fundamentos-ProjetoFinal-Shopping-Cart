const fetchProducts = async (query) => {
  // seu código aqui
  if (!query) {
    return new Error('You must provide an url');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  return response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

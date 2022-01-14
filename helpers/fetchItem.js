const fetchItem = async (id) => {
  // seu código aqui
  if (!id) {
    return new Error('You must provide an url');
  }

  const item = await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((product) => product.json());
    return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

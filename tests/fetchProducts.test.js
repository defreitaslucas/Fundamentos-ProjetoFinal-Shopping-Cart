require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Verifica a função fetchProducts com o argumento "computador" se está sendo chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador" a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador')
    expect(response).toEqual(computadorSearch);
  })

  it('Verifica se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});

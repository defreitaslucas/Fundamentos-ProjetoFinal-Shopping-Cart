require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchItem é uma função', async () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Verifica a função fetchItem com o argumento "MLB1615760527" se está sendo chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar a função fetchItem com o argumento "MLB1615760527" a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
  const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Verifica se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527')
    expect(response).toEqual(item);
  })

  it('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se saveCartItems com o argumento <ol><li>Item</li></ol> chama localStorage.setItem', () => {
    const test = document.createElement('div');
    test.innerHTML = '<ol><li>Item</li></ol>';
    saveCartItems(test.firstChild);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica se ao execitar saveCartItems com o argumento <ol><li>Item</li></ol> o metodo localStorage.setItem e chamado com dois parametros', () => {
    const test = document.createElement('div');
    test.innerHTML = '<ol><li>Item</li></ol>';
    saveCartItems(test.firstChild);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', test.firstChild.innerHTML);
  });
});

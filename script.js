const resultQuerySelector = '.cart__items';

function totalItems() {
  const cartItens = document.querySelectorAll(`${resultQuerySelector} li`);
  let contador = 0;
  cartItens.forEach((item) => {
    const price = item.innerText.split('PRICE: $')[1];
    contador += parseFloat(price);
  });
  contador = Math.round(contador * 100) / 100;
  return contador;
}

function totalPrice() {
  const price = document.querySelector('.total-price');
  price.innerHTML = totalItems();
}

function clearCart() {
  const cart = document.querySelector(resultQuerySelector);
  cart.innerHTML = '';
  totalPrice();
  saveCartItems(cart);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const itemClick = document.querySelector(resultQuerySelector);
  itemClick.removeChild(event.target);
  saveCartItems(itemClick);
  totalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createCartItems = async (itemId) => {
  try {
    const item = await fetchItem(itemId);
    const itemElement = createCartItemElement(item);
    const cartItem = document.querySelector('.cart__items');
    cartItem.appendChild(itemElement);
    saveCartItems(cartItem);
    totalPrice();
  } catch (error) {
    return error;
  }
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    createCartItems(sku);
  });
  section.appendChild(button);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function adicionaRemoveCarrinho() {
  const items = document.querySelectorAll(`${resultQuerySelector} li`);
  items.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

async function init(query) {
  const data = await fetchProducts(query);
  const { results } = data;
  results.forEach((element) => {
    const object = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const items = document.querySelector('.items');
    const elementProduct = createProductItemElement(object);
    items.appendChild(elementProduct);
  });
}

window.onload = () => {
  init('computador');
  list = document.querySelector(resultQuerySelector);
  list.innerHTML = getSavedCartItems();
  adicionaRemoveCarrinho();
  totalPrice();
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', clearCart);
};
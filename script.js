const querySelector = '.cart__items';

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

function totalPrice() {
  const itensCart = document.querySelectorAll('.cart__items li');
  let acumulador = 0;
  itensCart.forEach((elemento) => {
    const price = elemento.innerText.split('PRICE: $')[1];
    acumulador += parseFloat(price);
  });
  acumulador = Math.round(acumulador * 100) / 100;
  const total = document.querySelector('.total-price');
  total.innerHTML = `Preço total: $${acumulador}`;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const lista = document.querySelector(querySelector);
  lista.removeChild(event.target);
  totalPrice();
  saveCartItems(lista);
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function insereCarrinho(sku) {
  try {
    const item = await fetchItem(sku);
    const itemCarrinho = createCartItemElement(item);
    const ol = document.querySelector(querySelector);
    ol.appendChild(itemCarrinho);
    totalPrice();
    saveCartItems(ol);
  } catch (error) {
    return error;
  }
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttonAdd = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.appendChild(buttonAdd);
  buttonAdd.addEventListener('click', () => {
    insereCarrinho(sku);
  });
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function carregaItensNaTela(query) {
  try {
    const objeto = await fetchProducts(query);
    const { results } = objeto;
    results.forEach((element) => {
      const { id: sku, title: name, thumbnail: image } = element;
      const containerItens = document.querySelector('.items');
      const itensNaTela = (createProductItemElement({ sku, name, image }));
      containerItens.appendChild(itensNaTela);
    });
  } catch (error) {
    return error;
  }
}

function removeLoading() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

function clearCart() {
  const li = document.querySelectorAll('.cart__item');
  li.forEach((element) => element.remove());
  const lista = document.querySelector(querySelector);
  totalPrice();
  saveCartItems(lista);
}

function recuperaLocalStorage() {
  const lista = document.querySelector(querySelector);
  lista.innerHTML = getSavedCartItems();
  // depois que recuperei os itens nas linhas 77 e 78 eu tenho que recuperar os escutadores conforme fiz abaixo
  const li = document.querySelectorAll('.cart__items li');
  li.forEach((element) => element.addEventListener('click', cartItemClickListener));
}

window.onload = () => {
  carregaItensNaTela('computador');
  recuperaLocalStorage();
  removeLoading();
  const buttonClear = document.querySelector('.empty-cart');
  buttonClear.addEventListener('click', clearCart);
};

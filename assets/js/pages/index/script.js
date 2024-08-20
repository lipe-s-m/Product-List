import obterProdutosCarrinho from "./carrinho.js";
import {
  decrementarUnidadeProduto,
  incrementarUnidadeProduto,
} from "./modificar-carrinho.js";

class Carrinho {
  constructor() {
    if (Carrinho.instance) return Carrinho.instance;
    this.produtos = [];
    this.valorCompra = 0.0;
    Carrinho.instance = this;
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
    console.log(this.produtos);
    let precoProduto = produto.precoProduto;
    precoProduto = precoProduto.replace("R$", "").replace(",", ".").trim();
    this.valorCompra += parseFloat(precoProduto);
  }
  removerProduto(produto) {
    const index = this.produtos.findIndex((product) => {
      return product.nomeProduto === produto.nomeProduto;
    });

    if (index !== -1) {
      this.produtos.splice(index, 1);
      let precoProduto = produto.precoProduto;
      precoProduto = precoProduto.replace("R$", "").replace(",", ".").trim();
      this.valorCompra -= parseFloat(precoProduto);
      console.log(this.produtos);
    }
  }
  obterProdutos() {
    return this.produtos;
  }
}

const DataManager = new Carrinho();
export default DataManager;
var i = 0;

window.adicionarProduto = function (product) {
  const cardAddProduto = document
    .getElementById(product)
    .querySelector(".adicionar-carrinho");
  const nomeProduto = document
    .getElementById(product)
    .querySelector(".descricao-sobremesa")
    .querySelectorAll("p")[0].textContent;
  const descProduto = document
    .getElementById(product)
    .querySelector(".descricao-sobremesa")
    .querySelectorAll("p")[1].textContent;
  const precoProduto = document
    .getElementById(product)
    .querySelector(".descricao-sobremesa")
    .querySelectorAll("p")[2].textContent;
  const imgProduto = document.getElementById(product).querySelector("img");
  const newProduct = {
    nomeProduto,
    descProduto,
    precoProduto,
    imgProduto,
    unidadeProduto: 1,
  };

  DataManager.adicionarProduto(newProduct);

  const count = 1;

  const qntProdutos = document
    .getElementById(product)
    .querySelector(".modificar-carrinho");

  let addProductImage = document.createElement("img");
  addProductImage.src = "assets/images/icon-increment-quantity.svg";
  addProductImage.alt = "Adicionar uma unidade ao carrinho";
  addProductImage.addEventListener("click", function () {
    incrementarUnidadeProduto(product, newProduct);
  });

  let removeProductImage = document.createElement("img");
  removeProductImage.src = "assets/images/icon-decrement-quantity.svg";
  removeProductImage.alt = "Remover uma unidade do carrinho";
  removeProductImage.addEventListener("click", function () {
    decrementarUnidadeProduto(product, newProduct);
  });

  let texto = document.createTextNode(`${count}`);
  let elementoTexto = document.createElement("span");
  elementoTexto.appendChild(texto);

  cardAddProduto.hidden = true;
  qntProdutos.classList.remove("hidden");

  qntProdutos.innerHTML = "";
  qntProdutos.appendChild(removeProductImage);
  qntProdutos.appendChild(elementoTexto);
  qntProdutos.appendChild(addProductImage);

  i++;
  obterProdutosCarrinho();
};

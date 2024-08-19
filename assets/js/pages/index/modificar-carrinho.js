import obterProdutosCarrinho from "./carrinho.js";
import DataManager from "./script.js";

export function incrementarUnidadeProduto(product, newProduct) {
    DataManager.adicionarProduto(newProduct);
  const qntProdutosLabel = document
    .getElementById(product)
    .querySelector(".modificar-carrinho")
    .querySelector("span");
  newProduct.unidadeProduto++;
  qntProdutosLabel.textContent = newProduct.unidadeProduto;
  obterProdutosCarrinho();
}

export function decrementarUnidadeProduto(product, newProduct) {
    DataManager.removerProduto(newProduct);
  const qntProdutosLabel = document
    .getElementById(product)
    .querySelector(".modificar-carrinho")
    .querySelector("span");
  if (newProduct.unidadeProduto > 1) {
    newProduct.unidadeProduto--;
    qntProdutosLabel.textContent = newProduct.unidadeProduto;
  } else if (newProduct.unidadeProduto === 1) {
    newProduct.unidadeProduto--;
    const qntProdutos = document
      .getElementById(product)
      .querySelector(".modificar-carrinho");
    qntProdutos.classList.add("hidden");
    const cardAddProduto = document
      .getElementById(product)
      .querySelector(".adicionar-carrinho");
    cardAddProduto.hidden = false;
  }
  obterProdutosCarrinho();
}

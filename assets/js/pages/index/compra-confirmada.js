import DataManager from "./script.js";

export function obterProdutosCompraConfirmada() {
  //exibir modal
  const showModal = document.getElementById("modal");
  showModal.style.display = "block";
  //fechar modal
  const hiddenModal = document
    .getElementById("modal-content")
    .querySelector("button");
  hiddenModal.addEventListener("click", () => {
    showModal.style.display = "none";
    const listaProdutos = DataManager.obterProdutos();
    const listaUnitariaTemp = new Set();
    const resetBorder = document.querySelectorAll(".imagem-produto");
    resetBorder.forEach(produto =>{
      produto.style.border = "none";
      console.log(produto)
    })

    listaProdutos.forEach((produto) => {
      if (!listaUnitariaTemp.has(produto.nomeProduto)) {
        const productBox = document
          .getElementById(produto.nomeProduto.toLowerCase())
          .querySelector("img");
        productBox.style.border = "3px solid var(--red)";
        console.log(produto.nomeProduto)
        listaUnitariaTemp.add(produto.nomeProduto);
      } 
    });
  });

  const products = DataManager.obterProdutos();
  const containerProducts = document
    .getElementById("modal-content")
    .querySelector("#produtos-confirmar-compra");
  containerProducts.innerHTML = "";

  const listaProdutos = document.createElement("div");
  listaProdutos.classList = "lista-produtos-carrinho";

  const listaUnitaria = new Set();
  products.forEach((produto) => {
    if (!listaUnitaria.has(produto.descProduto)) {
      const product = document.createElement("article");
      const productContent = document.createElement("div");
      productContent.classList = "conteudo-produto";
      const productDetails = document.createElement("div");
      productDetails.classList = "detalhes-produto";

      product.className = "card-produto";
      const imgProduto = document.createElement("img");
      imgProduto.src = produto.imgProduto.src;
      product.appendChild(imgProduto);

      const nomeProduto = document.createElement("span");
      nomeProduto.textContent = `${produto.descProduto}`;
      nomeProduto.className = "titulo-produto";
      productContent.appendChild(nomeProduto);

      const unidadeProduto = document.createElement("span");
      unidadeProduto.textContent = `${produto.unidadeProduto}x`;
      unidadeProduto.className = "unidade-produto detalhes-produto";
      productDetails.appendChild(unidadeProduto);

      const precoUnitarioProduto = document.createElement("span");
      precoUnitarioProduto.textContent = `@ ${produto.precoProduto}`;
      precoUnitarioProduto.className = "preco-produto detalhes-produto";
      productDetails.appendChild(precoUnitarioProduto);

      const precoTotalProduto = document.createElement("span");
      let precoTotalProdutoCount = produto.precoProduto
        .replace("R$", "")
        .replace(",", ".")
        .trim();
      precoTotalProdutoCount = precoTotalProdutoCount * produto.unidadeProduto;
      precoTotalProduto.textContent = `R$ ${precoTotalProdutoCount
        .toFixed(2)
        .replace(".", ",")
        .trim()}`;
      precoTotalProduto.className = "preco-total detalhes-produto";
      productDetails.appendChild(precoTotalProduto);

      productContent.appendChild(productDetails);
      product.appendChild(productContent);
      listaProdutos.appendChild(product);
      listaProdutos.appendChild(document.createElement("hr"));
      containerProducts.appendChild(listaProdutos);
      listaUnitaria.add(produto.descProduto);
    }
  });
  const infoCarrinho = document.createElement("div");
  infoCarrinho.classList = "info-carrinho";

  const precoCarrinho = document.createElement("span");
  precoCarrinho.textContent = `R$ ${DataManager.valorCompra
    .toFixed(2)
    .replace(".", ",")
    .trim()}`;
  infoCarrinho.textContent = "Preço total:";
  infoCarrinho.appendChild(precoCarrinho);
  containerProducts.appendChild(infoCarrinho);
}

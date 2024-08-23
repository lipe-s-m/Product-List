import DataManager from "./script.js";

export default function obterProdutosCarrinho() {
  const productList = DataManager.obterProdutos();
  const productCount = productList.length;

  const titleCarrinho = document.getElementById("carrinho").querySelector("h2");
  const elementosCarrinho = document
    .getElementById("carrinho")
    .querySelector("#elementos-carrinho");
  const br1 = document.createElement("br");
  const br2 = document.createElement("br");

  titleCarrinho.innerHTML = "";
  elementosCarrinho.innerHTML = "";
  const carrinhoFormatado = new Set();

  productList.forEach((produto) => {
    const nomeProduto = produto.nomeProduto;

    //vou verificar se o produto ja foi visto
    if (!carrinhoFormatado.has(nomeProduto)) {
      const descProduto = produto.descProduto;
      const tituloProduto = document.createTextNode(`${descProduto}`);
      const unidadeProduto = produto.unidadeProduto;
      let precoProduto = produto.precoProduto;

      precoProduto = precoProduto.replace("R$", "").replace(",", ".").trim();
      const precoTotal = parseFloat(precoProduto) * unidadeProduto;
      // const imagemProdutoTemp = produto.imgProduto;
      // let imgProduto = document.createElement("img");
      // imgProduto.src = imagemProdutoTemp.src
      // imgProduto.style.width = '62px'
      // imgProduto.style.height = '62px'

      const produtoCarrinhoContainer = document.createElement("div");
      produtoCarrinhoContainer.className = "produto-carrinho-container";

      const produtoCarrinhoDetalhes = document.createElement("div");
      produtoCarrinhoDetalhes.className = "produto-carrinho-detalhes";

      const tituloProdutoSpan = document.createElement("span");
      tituloProdutoSpan.textContent = `${descProduto}`;
      tituloProdutoSpan.className = "titulo-produto";
      produtoCarrinhoContainer.appendChild(tituloProdutoSpan);

      const unidadeProdutoSpan = document.createElement("span");
      unidadeProdutoSpan.textContent = `${unidadeProduto}x`;
      unidadeProdutoSpan.className = "unidade-produto";
      produtoCarrinhoDetalhes.appendChild(unidadeProdutoSpan);

      const precoProdutoSpan = document.createElement("span");
      precoProdutoSpan.textContent = `@ R$${precoProduto}`;
      precoProdutoSpan.className = "preco-produto";
      produtoCarrinhoDetalhes.appendChild(precoProdutoSpan);

      const precoTotalSpan = document.createElement("span");
      precoTotalSpan.textContent = `R$ ${precoTotal.toFixed(2)}`;
      precoTotalSpan.className = "preco-total";
      produtoCarrinhoDetalhes.appendChild(precoTotalSpan);

      produtoCarrinhoContainer.appendChild(produtoCarrinhoDetalhes);

      elementosCarrinho.appendChild(document.createElement("br"));
      elementosCarrinho.appendChild(produtoCarrinhoContainer);
      carrinhoFormatado.add(nomeProduto);
    }
  });

  const confimarCompra = document
    .getElementById("carrinho")
    .querySelector("#confirmar-compra");
  if (productList.length) {
    confimarCompra.hidden = false;
    const precoTotalCarrinho = confimarCompra.querySelector(
      "#preco-total-carrinho"
    );

    precoTotalCarrinho.innerHTML = "";
    precoTotalCarrinho.appendChild(
      document.createTextNode(`R$ ${(DataManager.valorCompra.toFixed(2).replace(".", ","))}`)
    );
  } 
  
  else {
    confimarCompra.hidden = true;
    const imageCarrinhoVazio = document.createElement("img");
    imageCarrinhoVazio.src = "assets/images/illustration-empty-cart.svg";
    elementosCarrinho.appendChild(imageCarrinhoVazio);
    elementosCarrinho.appendChild(document.createElement("br"));
    elementosCarrinho.appendChild(
      document.createTextNode(`Seus itens adicionados irão aparecer aqui`)
    );
  }

  let countText = document.createTextNode(`Seu Carrinho (${productCount})`);
  titleCarrinho.appendChild(countText);
}

import DataManager from "./script.js";

export default function obterProdutosCarrinho() {
  const productList = DataManager.obterProdutos();
  const productCount = productList.length;

  const titleCarrinho = document.getElementById("carrinho").querySelector("h2");
  const elementosCarrinho = document
    .getElementById("carrinho")
    .querySelector("#elementos-carrinho");
  const br = document.createElement("br");

  titleCarrinho.innerHTML = "";
  elementosCarrinho.innerHTML = "";
  const carrinhoFormatado = new Set();

  productList.forEach((produto) => {
    const nomeProduto = produto.nomeProduto;

    //vou verificar se o produto ja foi visto
    if (!carrinhoFormatado.has(nomeProduto)) {
      const unidadeProduto = produto.unidadeProduto;
      const precoProduto = produto.precoProduto;
      // const imagemProdutoTemp = produto.imgProduto;
      // console.log(imagemProdutoTemp)
      // let imgProduto = document.createElement("img");
      // // imgProduto.src = imagemProdutoTemp
      // imgProduto.style.width = '30px'
      // imgProduto.style.height = '30px'

      let nomeProdutoText = document.createTextNode(
        `${unidadeProduto}x ${nomeProduto}    -   ${precoProduto} \n`
      );

      elementosCarrinho.appendChild(br);
      // elementosCarrinho.appendChild(imgProduto);
      elementosCarrinho.appendChild(nomeProdutoText);
      carrinhoFormatado.add(nomeProduto);
    }
  });

  let countText = document.createTextNode(`Seu Carrinho (${productCount})`);

  titleCarrinho.appendChild(countText);
}

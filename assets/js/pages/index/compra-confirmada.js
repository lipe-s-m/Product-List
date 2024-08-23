import DataManager from "./script.js";

export function obterProdutosCompraConfirmada() {
  console.log("Carrinho: ", DataManager.obterProdutos());

  const showModal = document.getElementById("modal");
  showModal.style.display = "block";

  const hiddenModal = document.getElementById("modal-content").querySelector("button");
  hiddenModal.addEventListener("click", () => {showModal.style.display = "none"});
}

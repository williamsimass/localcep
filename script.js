const form = document.querySelector("#cep-form");
const cepInput = document.querySelector("#cep-input");
const cepInfo = document.querySelector("#cep-info");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cep = cepInput.value.replace(/\D/g, "");
  buscarCep(cep);
});
function buscarCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Erro ao buscar CEP: ${response.status}`);
      }
    })
    .then((data) => {
      exibirCep(data);
    })
    .catch((error) => {
      console.error(error);
      exibirErro(
        "Erro ao buscar CEP. Verifique se o CEP é válido e tente novamente."
      );
    });
}
function exibirCep(cep) {
  cepInfo.innerHTML = ` <p><strong>CEP:</strong> ${cep.cep}</p> <p><strong>Logradouro:</strong> ${cep.logradouro}</p> <p><strong>Complemento:</strong> ${cep.complemento}</p> <p><strong>Bairro:</strong> ${cep.bairro}</p> <p><strong>Cidade:</strong> ${cep.localidade}</p> <p><strong>Estado:</strong> ${cep.uf}</p> `;
  cepInfo.style.display = "block";
}
function exibirErro(mensagem) {
  cepInfo.innerHTML = `<p>${mensagem}</p>`;
  cepInfo.style.display = "block";
}

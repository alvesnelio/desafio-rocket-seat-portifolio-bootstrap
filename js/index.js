// lista de Objetos de repositorios
const listaRepositorios = [];

// Elementos HTMl
let elementsHtml = {
  front: {
    listaRepositorios: "#frontListaRepositorios",
    repositorio: "#frontRepositorio"
  },
  mensagem: `
    <div class="col-12">
      <p style="width: 100%; border-radius: 10px; text-align: center; display: block;padding: 10px; background-color: rgba(210,70,70,0.5); color: white;">
        erroMensagem
      </p>
    </div>
  `
};

function carregarMensagemErro(mensagem) {
  return (getFrontListaRepositorios().innerHTML += elementsHtml.mensagem.replace(/erroMensagem/g, mensagem));
}

function getFrontListaRepositorios() {
  return document.querySelector(elementsHtml.front.listaRepositorios);
}

function getFrontRepositorio() {
  return document.querySelector(elementsHtml.front.repositorio);
}

function carregarRepositorios(listaObjetos) {
  let listRepositorios = listaObjetos;

  let htmlRepositorios = "";

  let repositorioFake = getFrontRepositorio();
  for (let index = 0; index < listRepositorios.length; index++) {
    repositorioFake.id = elementsHtml.front.repositorio + index;

    if (repositorioFake.id !== elementsHtml.front.repositorio) {
      repositorioFake.classList.remove("d-none");
    }

    repositorioFake.getElementsByClassName("repositorio-name")[0].innerHTML = listRepositorios[index].name;
    repositorioFake.getElementsByClassName("repositorio-description")[0].innerHTML = listRepositorios[index].description;
    repositorioFake.getElementsByClassName("repositorio-url")[0].setAttribute("href", listRepositorios[index].url);
    repositorioFake.getElementsByClassName("repositorio-url-github")[0].setAttribute("href", listRepositorios[index].url);

    htmlRepositorios += repositorioFake.outerHTML;
  }

  getFrontListaRepositorios().innerHTML += htmlRepositorios;
  getFrontListaRepositorios().firstElementChild.remove();
}

function getApiGithub(username) {
  /* Criar uma nova instancia de requisição http */
  const xhr = new XMLHttpRequest();

  const url = `https://api.github.com/users/${username}/repos`;

  xhr.open("GET", url, true);

  // Enviar requisição
  xhr.send();

  //Executar a requisição
  xhr.onload = function () {
    //Converter em json o resultado
    const data = JSON.parse(this.response);

    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element);
        listaRepositorios.push({name: element.name, description: element.description, url: element.html_url});
      }

      carregarRepositorios(listaRepositorios);
    } else {
      throw new Error("Não temos conteudo");
    }
  };
}

getApiGithub("alvesnelio");
let todasAsPerguntas = [];

// Pegando os elementos do HTML
const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");

let indiceAtual = 0;
let acertos = 0;

// Carrega as perguntas do JSON
fetch("perguntas.json")
  .then(response => response.json())
  .then(data => {
    todasAsPerguntas = data; // Armazena os dados carregados
    perguntas = todasAsPerguntas.sort(() => 0.5 - Math.random()).slice(0, 10);
    carregarPergunta(); // Inicia o jogo após carregar
  })
  .catch(error => console.error("Erro ao carregar perguntas:", error));

// Função para carregar uma nova pergunta
function carregarPergunta() {
  progressoElemento.innerHTML = `${indiceAtual + 1}/${perguntas.length}`;
  const perguntaAtual = perguntas[indiceAtual];
  perguntaElemento.innerHTML = perguntaAtual.pergunta;
  respostasElemento.innerHTML = "";

  for (let i = 0; i < perguntaAtual.respostas.length; i++) {
    const resposta = perguntaAtual.respostas[i];
    const botao = document.createElement("button");
    botao.classList.add("botao-resposta");
    botao.innerText = resposta.opcao;

    botao.onclick = function () {
      const botoes = document.querySelectorAll(".botao-resposta");

      // Desabilita todos os botões e marca os estilos corretos
      botoes.forEach((b, idx) => {
        b.disabled = true;
        if (perguntaAtual.respostas[idx].correto) {
          b.classList.add("correta");
        } else if (b === botao) {
          b.classList.add("errada");
        }
      });

      if (resposta.correto) {
        acertos++;
      }

      setTimeout(() => {
        indiceAtual++;
        if (indiceAtual < perguntas.length) {
          carregarPergunta();
        } else {
          finalizarJogo();
        }
      }, 1000);
    };
    respostasElemento.appendChild(botao);
  }
}

// Tela final
function finalizarJogo() {
  const total = perguntas.length;
  const porcentagem = (acertos / total) * 100;
  let mensagem = `Você acertou ${acertos} de ${total} perguntas. `;
  if(porcentagem >= 70){
    mensagem += "Parabéns! Você foi muito bem!";
  }else{
    mensagem += "Tente novamente para melhorar seu resultado.";
  }
  textoFinal.innerHTML = mensagem;
  conteudo.style.display = "none";
  conteudoFinal.style.display = "flex";
}

const botaoAtualizar =  document.getElementById("botao-atualizar");
botaoAtualizar.addEventListener("click", function(){
  location.reload(); //carrega a página
});

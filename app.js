// Estado do jogo
let listaDeNumerosSorteados = [];
const numeroLimite = 20;           // <-- nome correto e constante
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Habilita voz
let vozHabilitada = false;
document.addEventListener('click', () => { vozHabilitada = true; }, { once: true });

function falar(texto) {
  if (window.responsiveVoice && vozHabilitada) {
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
  }
}

function exibirTextoNaTela(tag, texto) {
  const campo = document.querySelector(tag);
  if (!campo) return;
  campo.textContent = texto;      // texto seguro
  falar(texto);
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
  const input = document.querySelector('input'); // ou ".container__input"
  const chute = Number(input?.value);

  if (!Number.isFinite(chute) || chute < 1 || chute > numeroLimite) {
    exibirTextoNaTela('p', `Digite um número de 1 a ${numeroLimite}.`);
    limparCampo();
    return;
  }

  if (chute === numeroSecreto) {
    exibirTextoNaTela('h1', 'Parabéns, você Acertou!');
    const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    exibirTextoNaTela('p', `O número secreto é ${chute > numeroSecreto ? 'menor' : 'maior'}.`);
  }

  tentativas++;
  limparCampo();
}

function gerarNumeroAleatorio() {
  // Reinicia a lista quando todos os números já saíram
  if (listaDeNumerosSorteados.length === numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  const numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    // evita repetição
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    // console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  const chute = document.querySelector('input');
  if (chute) chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  limparCampo();
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}

import { palavraAleatoria } from "./escolhePalavra.js";

const palavraEscolhida = await palavraAleatoria.criaPalavra();

const main = document.querySelector('main');
const header = document.querySelector('.navegacao');

const teclado = document.querySelectorAll('.tecla');
const tecladoArray = [...teclado];

export default function verificaPalpite(palpite) {
    const palpiteCompleto = palpite[0];
    const colunaNumero = palpite[1];

    const colunas = document.querySelectorAll('.coluna');
    const coluna = colunas[colunaNumero];
    const blocos = coluna.children;

    const blocosArray = [...blocos];

    const palpiteSeparado = Array.from(palpiteCompleto);
    const palavraSeparada = Array.from(palavraEscolhida);
    
    var letrasRepetidas = criaObjeto(palavraSeparada);

    var letrasCorretas = 0;

    var jogoVencido = false;

    palpiteSeparado.forEach((letra, indice) => {
        const bloco = blocosArray[indice];

        if (palavraSeparada[indice] === letra) { 
            bloco.style.backgroundColor = 'var(--verde)'

            var teclaLetra = tecladoArray.find(tecla => tecla.innerText === letra.toUpperCase());

            teclaLetra.style.backgroundColor = 'var(--verde)';

            var letraEncontrada = letrasRepetidas.find(repeticao => repeticao.nome === letra);
            letrasCorretas++;

            if (letraEncontrada.repeticoes <= 0) {
                const blocoApagar = blocosArray.find(blocoEncontrar => blocoEncontrar.innerText === letra.toUpperCase());
                blocoApagar.style.backgroundColor = 'var(--cinza-bordas)';
            }

            else {
                letraEncontrada.repeticoes--;
            }
        } 
        
        else if (palavraSeparada.includes(letra)) {
            var letraEncontrada = letrasRepetidas.find(repeticao => repeticao.nome === letra);

            var teclaLetra = tecladoArray.find(tecla => tecla.innerText === letra.toUpperCase());

            if (teclaLetra.style.backgroundColor === 'var(--verde)') {
            
            }

            else {
                teclaLetra.style.backgroundColor = 'var(--dourado)';
            }

            if (letraEncontrada.repeticoes > 0) {
                bloco.style.backgroundColor = 'var(--dourado)'
                letraEncontrada.repeticoes--;
            }

            else {
                bloco.style.backgroundColor = 'var(--cinza-bordas)'
            }

        } 
        
        else {
            bloco.style.backgroundColor = 'var(--cinza-bordas)'

            var teclaLetra = tecladoArray.find(tecla => tecla.innerText === letra.toUpperCase());

            teclaLetra.style.backgroundColor = 'var(--cinza-bordas)';
        }

        bloco.style.borderColor = 'var(--fundo)';
    });

    if (letrasCorretas >= 5) {
        jogoVencido = true;

        const elemento = document.createElement('div');
        elemento.className = "mensagem-acerto";
        elemento.innerHTML = `<p class="acerto-texto">Você acertou! Fim de jogo!</p>`;
        header.appendChild(elemento);

        const botao = document.createElement('div');
        botao.className = "botao-reiniciar";
        botao.innerHTML = `<p class="botao-texto">JOGAR NOVAMENTE</p>`;
        main.appendChild(botao);

        botao.addEventListener('click', () => location.reload());
    }

    return jogoVencido;
}

function criaObjeto(palavra) {
    var repeticoes = [];
    palavra.forEach((letra) => {
        const repetidas = palavra.filter((letraRepetida) => letraRepetida === letra).length;
        if (repeticoes.find((favorito) => favorito.nome === letra)) {

        }

        else {
            repeticoes.push({
                nome: letra,
                repeticoes: repetidas
            })
        }
    })

    return repeticoes;
}
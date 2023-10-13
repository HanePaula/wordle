import { palavraAleatoria } from "./escolhePalavra.js";
import verificaPalpite from "./verificaPalpite.js";

const palavras = await palavraAleatoria.listaPalavras();
const blocos = document.querySelectorAll('.bloco');
const colunas = document.querySelectorAll('.coluna');
const header = document.querySelector('.navegacao');

var blocoNumero = 0;
var colunaNumero = 0;

var jogoVencido = false;



function digitaTecladoVirtual() {
    const teclas = document.querySelectorAll('#tecla');

    teclas.forEach((tecla) => {
        tecla.addEventListener("click", () => {
            if (jogoVencido === false) {
                if (tecla.innerText == "ENTER") {
                    const resultadoPalpite = enviarPalpite();

                    if (resultadoPalpite !== undefined) {
                        jogoVencido = verificaPalpite(resultadoPalpite);
                    }
                }

                else if (tecla.innerText == "") {
                    apagarLetra();
                }

                else {
                    digitarLetra(tecla.innerText);
                }
            }
        })
    })
}

function digitaTecladoNormal() {
    const teclasDisponiveis = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
        'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN',
        'KeyM'];

    document.addEventListener("keydown", (tecla) => {
        const teclaPressionada = tecla.code;
        const teclaTexto = tecla.key;

        if (jogoVencido === false) {

            if (teclaPressionada === 'Enter') {
                const resultadoPalpite = enviarPalpite();
                if (resultadoPalpite !== undefined) {
                    jogoVencido = verificaPalpite(resultadoPalpite);
                }
            }

            else if (teclaPressionada === 'Backspace') {
                apagarLetra();
            }

            else if (teclasDisponiveis.includes(teclaPressionada)) {
                digitarLetra(teclaTexto.toUpperCase());
            }

            else {

            }

        }
    })
}

function digitarLetra(texto) {
    const blocosArray = [...blocos];
    const blocoPreencher = blocosArray.find((bloco) => bloco.dataset.preencher === 'vazio');

    if (blocoNumero > 4) {

    }

    else {
        blocoPreencher.innerText = texto;
        blocoPreencher.dataset.preencher = 'cheio';
        blocoNumero++;
    }
}

function apagarLetra() {
    const coluna = colunas[colunaNumero];
    const blocos = coluna.children;
    const bloco = blocos[blocoNumero - 1];
    bloco.innerText = "";
    bloco.dataset.preencher = 'vazio';
    blocoNumero--;
}

function enviarPalpite() {
    const coluna = colunas[colunaNumero];
    const blocos = coluna.children;
    const blocosArray = [...blocos];
    var texto = "";

    blocosArray.forEach((bloco) => {
        texto = texto + bloco.innerText;
    })

    const palpite = texto.toLowerCase();
    blocoNumero = 0;

    if (palpite.length !== 5) {
        if (header.lastChild.className === 'mensagem-erro') {
            header.removeChild(header.lastChild);
        }

        const elemento = document.createElement('div');
        elemento.className = "mensagem-erro";
        elemento.innerHTML = `<p class="mensagem-texto">Preencha todas as letras</p>`;
        header.appendChild(elemento);

        blocosArray.forEach((bloco) => {
            bloco.innerText = "";
            bloco.dataset.preencher = 'vazio';
        })
    }

    else if (!palavras.includes(palpite)) {
        if (header.lastChild.className === 'mensagem-erro') {
            header.removeChild(header.lastChild);
        }

        const elemento2 = document.createElement('div');
        elemento2.className = "mensagem-erro";
        elemento2.innerHTML = `<p class="mensagem-texto">Palavra não está na lista</p>`;
        header.appendChild(elemento2);

        blocosArray.forEach((bloco) => {
            bloco.innerText = "";
            bloco.dataset.preencher = 'vazio';
        })
    }

    else {
        if (header.lastChild.className === 'mensagem-erro') {
            header.removeChild(header.lastChild);
        }
        colunaNumero++;

        return [palpite, (colunaNumero - 1)];
    }
}

digitaTecladoVirtual();
digitaTecladoNormal();



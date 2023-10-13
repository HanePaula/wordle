async function listaPalavras() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/hexapode/an-array-of-portuguese-words/master/words.json");

        if (!response.ok) {
            throw new Error("Falha ao buscar palavras aleatórias.");
        }

        const data = await response.json();
        const palavrasCompletas = data;
        const palavrasSemAcentuacao = palavrasCompletas.filter((palavra) => {
            return !/[áàãâéèêíïóôõöúç]/i.test(palavra);
        })

                const palavrasErradas = ['rasil', 'uando','epois', 'alvez', 'orque', 'stado', 'empre', 'oogle', 
        'lguns', 'rande', 'https', 'nidos', 'uanto', 'edium', 'entro'];

        const palavras = palavrasSemAcentuacao.filter((palavra, indice) => palavra.length === 5 && !palavrasErradas.includes(palavra) &&
         indice <= 10000);



        return palavras;
    } catch (error) {
        console.error(error);
    }
}


async function criaPalavra() {
    const palavras = await listaPalavras();
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const palavraAleatoria = palavras[indiceAleatorio];
    
    return palavraAleatoria;
}

export const palavraAleatoria = {
    listaPalavras,
    criaPalavra
}



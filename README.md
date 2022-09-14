JavaScript Síncrono e Assíncrono

Ooopa, bom dia, boa tarde e boa noite pessoal, como vcs estão ??? Espero que bem o/

Nesse artigo abordaremos sobre alguns tópicos relacionados a JavaScript Assíncrono. Entre eles:
1. Callbacks
2. Promises
3. Async/Await

Para iniciarmos o entendimento, precisamos saber que nosso código JavaScript é executado
em uma única thread, ou seja, ao ser executado só pode fazer uma ação por vez.
O código é executado da primeira linha a última em ordem.

```
const firstFunction = () => {
    console.log('First Function called!');
}

const secondFunction = () => {
    console.log('Second Function called!!');
}

console.log('Calling firstFunction');
firstFunction(); // Resultado: First Function called!

console.log('Calling secondFunction');
secondFunction(); // Resultado: Second Function called!!
```

No exemplo acima pode-se observar que criamos as funções firstFunction e secondFunction, logo em seguida nós chamamos a firstFunction para ser executada e depois a secondFunction. Repare que nesse trecho existe uma ordem a ser seguida para execução, primeiro a firstFunction e depois a secondFunction. Esse é um exemplo do funcionamento do Js síncrono.

---
Agora, sabendo como é o funcionamento síncrono, o que vc pensa quando falamos sobre Js assíncrono ?

Para um melhor entendimento é bom sabermos que no código assíncrono ele pode iniciar seu processo nesse exato momento e pode ser finalizado daqui algum tempo, ou seja, o código leva um tempo para ser executado e também pode ser sucedido ou não.

Um simples exemplo de funcionamento do Js assíncrono é a função setTimeout(). Onde a mesma será
executada após X segundos no qual nós definimos em sua chamada. No exemplo abaixo o console.log dentro da função setTimeout só será exibido após 3 segundos, os demais logs serão exibidos sequencialmente, isso porque quando utilizamos a função setTimeout passamos a utilizar para esse caso o Js de forma assíncrona e os demais logs são executados de forma síncrona.

```
console.log('Início do exemplo');

setTimeout(() => {
    console.log('Esse log irá aparecer depois de 3 segundos');
}, 3000);

console.log('Esse log e o log abaixo irão aparecer antes do log dentro do setTimeOut');
console.log('Fim do exemplo');
```

Alguns exemplos mais reais de utilização são as requesições que fazemos as API's e interações com o banco de dados (inserções, consultas, etc). Quando fazemos a request podemos aguardar cerca de alguns segundos para receber uma resposta da API. Veremos um exemplo mais prático sobre realizar uma requisição no decorrer do artigo.

Lembram que foi comentado um pouco acima sobre o Js ser executado em uma única thread ? Pois então, as requisições são entregues para ser executadas em uma thread separada da atual. Por conta disso mesmo fazendo uma requisição em nosso código ele segue o jogo, fazendo o que precisa. No momento que a requisição é feita uma nova thread para ela é criada, enquanto isso o código que nós escrevemos vai sendo executado em sua "main thread".

Para tratar esse códigos assíncronos nós temos algumas maneiras, entre elas:
- Callbacks
- Promises
- Promises com Async/Await

Durante os exemplos e explições sobre esses tópicos vamos utilizar como base a ideia de consumir uma API de pokemóns :D
Algo semelhante ao funcionamento dessa aplicação https://codeboost.com.br/projetos/pokeapi/, onde podemos filtrar no lado esquerdo o tipo e como resposta temos os pokemons de tal tipo.
Vamos simular uma aplicação onde primeiro precisamos fazer uma requisição para a API de pokemon que nos retornará uma lista de pokemon por tipos, ou seja, vamos procurar por um tipo de pokemon e será nos retornado uma lista com tais pokemons. Em seguida, com o nome dos pokemons em mãos nós iremos fazer uma segunda requisição para ver detalhes sobre um único pokemon.
Nossa premissa nesse fluxo é que só podemos fazer a segunda request com o nome dos pokemons em mãos e para conseguir o nome é apenas fazendo a primeira requisição.

Nesse exemplo sobre Callbacks nós estamos simulando a requisição para a API.
Reparem que no resultado dos logs o valor do nosso retorno da API no nosso logs fica como 'undefined'. Isso acontece por conta do síncronismo do Js, no momento que fazemos o log das informações nós ainda não temos o retorno da API. Notem também que o log informando que estamos aguardando o retorno da API aparece por último, pois ele se encontra dentro do setTimeout e por consequencia será exibido após os 2 segundos.

```
const getPokemonByType = (type) => {
    console.log('Inicio da função getPokemonByType');

    setTimeout(() => {
        // Simulando o tempo de resposta da API
        console.log('Aguardando retorno da API - 2 segundos');

        // Simulando o retorno da API
        return [
            'Squirtle', 'Wartortle', 'Blastoise'
        ];
    }, 2000);
};

// Simulando requisição para API
const pokemonsByType = getPokemonByType('water');

console.log('Retorno da API: ', { pokemonsByType });
```
```
Resultado dos logs  

Inicio da função getPokemonByType
Retorno da API:  undefined
Aguardando retorno da API - 2 segundos
```

Nesse fluxo nos temos um problema. Estamos tentando exibir a lista de pokemons do tipo água porém no momento que estamos fazendo o log disso nós não possuímos o retorno da API.
Como podemos solucionar esse problema ?
Isso mesmo, através de Callbacks :D

Para podemos iniciar a solução vamos para uma breve e simples explicação do que são Callbacks.
Callbacks são nada mais e nada menos que funções que são passadas por argumento/parâmetro para outras outras funções, permitindo que uma função chame outra. Lembrando que para os casos de callback uma função que está sendo passada por parâmetro só será executada após a finalização da função que está recebendo como parâmetro.

Nesse exemplo nós chamamos a função firstFunction passando como parâmetro a função secondFunction, ou seja, recebemos como callback a função secondFunction na função
firstFunction. Lembrando que a secondFunction só será executa aqui após a finalização da firstFunction.
```
const firstFunction = (callback) => {
    console.log('First Function called!');
    callback();
}

const secondFunction = () => {
    console.log('Second Function called!!');
}

console.log('Calling firstFunction');
firstFunction(secondFunction); 
/* Resultado
Calling firstFunction
First Function called!
Second Function called!!
*/
```

Com esse entendimento em mãos, podemos aplicar essa solução para o nosso caso de uso da API de pokemons, certo ? vamos nessa ...

```
const getPokemonByType = (type, callback) => {
    console.log('Inicio da função getPokemonByType');

    setTimeout(() => {
        // Simulando o tempo de resposta da API
        console.log('Aguardando retorno da API - 2 segundos');

        // Simulando o retorno da API
        // Nesse caso com callback só será retornado após a finalização da função setTimeout
        callback(['Squirtle', 'Wartortle', 'Blastoise']);
    }, 2000);
};

// Simulando requisição para API
// Aqui temos um callback sendo passado para a função getPokemonByType onde logamos o retorno da API
const pokemonsByType = getPokemonByType('water', (pokemonsByType) => {
    console.log('Retorno da API: ', { pokemonsByType });
});
```
```
/* Resultado dos logs
Inicio da função getPokemonByType
Aguardando retorno da API - 2 segundos
Retorno da API:  { pokemonsByType: [ 'Squirtle', 'Wartortle', 'Blastoise' ] }
*/
```

Surgiu um cenário agora em que precisamos pegar os detalhes de algum pokemon da lista.
Para isso, vamos implementar uma função getPokemonDetail onde vamos receber por parâmetro um indice do array que é o nome de um pokemon e trazer os detalhes.

```
const getPokemonByType = (type, callback) => {
    console.log('Inicio da função getPokemonByType');

    setTimeout(() => {
        // Simulando o tempo de resposta da API
        console.log('Aguardando retorno da API - 2 segundos');

        // Simulando o retorno da API
        // Nesse caso com callback só será retornado após a finalização da função setTimeout
        callback(['Squirtle', 'Wartortle', 'Blastoise']);
    }, 2000);
};

// Função que recebe o nome de um pokemon e um callback
// Após 2 segundos e meio chamamos a função de callback definida na linha 28, onde exibimobos apenas alguns logs
const getPokemonDetail = ((pokemon, callback) => {
    setTimeout(() => {
        callback(`O pokemon ${pokemon} é da primeira geração`);
    }, 2500);
});

// Simulando requisição para API
// Aqui temos um callback sendo passado para a função getPokemonByType onde logamos o retorno da API
const pokemonsByType = getPokemonByType('water', (pokemonsByType) => {
    console.log('Retorno da API: ', pokemonsByType);
    console.log('Chamando a API de detalhes passando o pokemon Squirtle');

    // Chamada da função getPokemonDetail passando o primeiro valor do array retornado e um callback que recebe o retorno da execução da função.
    getPokemonDetail(pokemonsByType[0], (detail) => {
        console.log('Nessa função de callback recebemos o retorno com os detalhes do pokemon');
        console.log('Detalhes (retorno da execução da função getPokemonDetail): ', detail);
    });
});
```
```
Inicio da função getPokemonByType
Aguardando retorno da API - 2 segundos
Retorno da API:  [ 'Squirtle', 'Wartortle', 'Blastoise' ]
Chamando a API de detalhes passando o pokemon Squirtle
Nessa função de callback recebemos o retorno com os detalhes do pokemon
Detalhes (retorno da execução da função getPokemonDetail):  O pokemon Squirtle é da primeira geração
```

Caso surgi-se um novo cenário onde precisássemos fazer uma outra requisição após receber o retorno da função getPokemonDetail nós passaríamos a ter um "problema" ... Qual ?
Então, reparem que nesse código de exemplo que temos até o momento estamos chamando a função getPokemonByType e passando um callback, em seguida chamando a função getPokemonDetail e passando um outro callback e se tivesse que implementar esse novo cenário nós chamariamos essa nova função e passariamos um outro callback.
Com isso entramos no chamado "callback hell", onde passamos a ter uma série de callbacks aninhados, dificultando a visualização do código e até mesmo deixando seu entendimento muito confuso.

Para sanar esse problema foram criadas as Promises. Bora lá dar inicio nesse segundo método.
As promises são a evolução do callback, em uma definição mais conceitual promise é um objeto em Js que permite a execução de processamentos de forma assíncrona. Nela vamos ter o valor da exução salvo, sendo erro ou sucesso.

Bom ... vamos para a prática que deve ficar mais simples o entendimento.
Como primeiro passo vamos converter o início do nosso código onde utilizavamos callbacks para que passemos a utilizar promises.

```
const getPokemonByTypePromise = (type) => {
    // iniciando a promise
    // resolve - retorno success
    // reject - error
    return new Promise((resolve, reject) => {
        const error = false; // alterar para true para cair no reject

        if (error) {
            reject(new Error(`Ocorreu um erro ao listar os pokemons do tipo ${type}`));
        }

        console.log('Retorno da API caso sucesso');
        resolve(['Squirtle', 'Wartortle', 'Blastoise']);
    })
}

getPokemonByTypePromise('water')
    // chamamos o then caso o fluxo caia no resolve
    // aqui recebemos o retorno do resolve, no caso o array dos pokemons do tipo water
    .then((pokemonsByType) => {
        console.log(`Lista dos pokemons do tipo water: `, pokemonsByType);
    })
    // aqui caso o error seja true recebemos o retorno reject, nesse caso a mensagem de erro
    .catch((error) => {
        console.log(error);
    });
```
```
/* Resultado dos logs
Retorno da API caso sucesso
Lista dos pokemons do tipo water:  [ 'Squirtle', 'Wartortle', 'Blastoise' ]
*/
```

Agora como segundo momento, vamos refatorar o restante do código para deixar utilizar callbacks e começar a utilizar promises.
O funcionamento de nosso código é o mesmo porém agora com Promise.
Reparem que agora o código ficou menor e mais legível, mais fácil de ler e entender. Com isso o problema do "callback hell" foi resolvido.
Algumas observações sobre as promises:

1. Temos 2 maneiras de iniciar uma promise
```
// Maneira 1
const firstFunction = new Promise((resolve, reject) => {
    const error = false;

    if (error) {
        reject('error');
    }

    resolve('success');
});

// Maneira 2
const secondFunction = () => {
    return new Promise((resolve, reject) => {
        const error = false;

        if (error) {
            reject('error');
        }

        resolve('success');
    })
};
```
2. Caso uma promise execute outra, a promise anterior tem acesso ao retorno da primeira promise.

Vamos ver como ficou o código com promises:
```
const getPokemonByTypePromise = (type) => {
    // iniciando a Promise
    // resolve - retorno success
    // reject - error
    return new Promise((resolve, reject) => {
        const error = false; // alterar para true para cair no reject

        if (error) {
            reject(new Error(`Ocorreu um erro ao listar os pokemons do tipo ${type}`));
        }

        console.log('Retorno da API caso sucesso');
        resolve(['Squirtle', 'Wartortle', 'Blastoise']);
    })
}

const getPokemonDetailPromise = (pokemon) => {
        return new Promise((resolve, reject) => {
            const error = false; // alterar para true para cair no reject

            if (error) {
                reject(new Error(`Ocorre um erro ao gerar os detalhes do pokemon ${pokemon}`));
            }

            console.log('Retorno da API caso sucesso');
            resolve(`O pokemon ${pokemon} é da primeira geração`);
        });
};

getPokemonByTypePromise('water')
    // chamamos o then caso o fluxo caia no resolve
    // aqui recebemos o retorno do resolve, no caso o array dos pokemons do tipo water
    .then((pokemonsByType) => {
        console.log(`Lista dos pokemons do tipo water: `, pokemonsByType);
        // aqui vamos retornar o resultado da função getPokemonDetailPromise
        return getPokemonDetailPromise(pokemonsByType[0]);
    }).then((detail) => { // nesse then nós temos acesso ao resolve da Promise da função getPokemonDetailPromise
        console.log('Detalhes (retorno da execução da função getPokemonDetailPromise): ', detail);
    })
    // aqui caso o error seja true recebemos o retorno reject, nesse caso a mensagem de erro
    .catch((error) => {
        console.log(error);
    });
```
```
/* Resultado dos logs
Retorno da API caso sucesso
Lista dos pokemons do tipo water:  [ 'Squirtle', 'Wartortle', 'Blastoise' ]
Retorno da API caso sucesso
Detalhes (retorno da execução da função getPokemonDetailPromise):  O pokemon Squirtle é da primeira geração
*/
```

Um plus sobre promises é que é possível executar todas promises de uma vez utilizando o `Promise.all()`.
Segue exemplo onde temos 2 promises, a primeira é executada em 2 segundos e a segunda em 5 segundos, só teremos o resultado após a finalizar a execução da segunda promise que leva mais tempo.
```
const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const error = false;

        if (error) {
            reject('error');
        }

        resolve('success-1');
    }, 2000);
});

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const error = false;

        if (error) {
            reject('error');
        }

        resolve('success-2');
    }, 5000);
});

Promise.all([firstPromise, secondPromise]).then(result => {
    console.log(result);
});
```
```
/* Resultado dos logs
[ 'success-1', 'success-2' ]
*/
```

Agora vamos para o Async/Await que é uma forma para consumirmos as Promises.
Para utilizar o Async/Await precisamos que a função seja assíncrona como no exemplo abaixo.
```
const showFirstEvolution = async() => {
    
}
```

Utilizando Async/Await o código abaixo de onde estiver sendo utilizado só vai ser executado após as promises serem resolvidas.
Para que possamos capturar as rejects bastas utilizarmos Try/Catch.
```
const getPokemonByTypePromise = (type) => {
    // iniciando a Promise
    // resolve - retorno success
    // reject - error
    return new Promise((resolve, reject) => {
        const error = false; // alterar para true para cair no reject

        if (error) {
            reject(new Error(`Ocorreu um erro ao listar os pokemons do tipo ${type}`));
        }

        console.log('Retorno da API caso sucesso');
        resolve(['Squirtle', 'Wartortle', 'Blastoise']);
    })
}

const getPokemonDetailPromise = (pokemon) => {
        return new Promise((resolve, reject) => {
            const error = false; // alterar para true para cair no reject

            if (error) {
                reject(new Error(`Ocorre um erro ao gerar os detalhes do pokemon ${pokemon}`));
            }

            console.log('Retorno da API caso sucesso');
            resolve(`O pokemon ${pokemon} é da primeira geração`);
        });
};

const showFirstEvolution = async() => {
    try {
        // Nossa função getPokemonByTypePromise retornara o resolve e esse resolve ficará salvo na variável pokemonsByType
        const pokemonsByType = await getPokemonByTypePromise('water');
        console.log('Executou a função getPokemonByTypePromise e foi resolvida');

        const pokemonDetail = await getPokemonDetailPromise(pokemonsByType);
        console.log('Executou a função getPokemonDetailPromise e foi resolvida');

        console.log('Esse log só irá aparecer depois da execução das 2 funções');
        console.log('pokemonsByType: ', pokemonsByType);
        console.log('pokemonDetail: ', pokemonDetail);
        // Notem que esse log só aparece depois dos códigos acima serem executados.
        // Isso acontece por conta do Async/Await, com o await nós esperamos a promise ser resolvida ou rejeitada para assim dar seguimento no fluxo do código.
        console.log('Fim da execução');
    } catch (error) {
        // Para captturar o reject das promises basta utilizarmos try/catch
        console.log('Um erro ocorreu.', error);
    }
}

showFirstEvolution();
```
```
Retorno da API caso sucesso
Executou a função getPokemonByTypePromise e foi resolvida
Retorno da API caso sucesso
Executou a função getPokemonDetailPromise e foi resolvida
Esse log só irá aparecer depois da execução das 2 funções
pokemonsByType:  [ 'Squirtle', 'Wartortle', 'Blastoise' ]
pokemonDetail:  O pokemon Squirtle,Wartortle,Blastoise é da primeira geração
Fim da execução
```

Temos aqui também um exemplo real de uma API sendo consumida onde utilizamos promises e Async/Await.
```
const axios = require('axios');

// Exemplo real consumindo uma promise
axios.get("https://pokeapi.co/api/v2/pokemon/squirtle").then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
});

// Exemplo real utilizando asyn/await
const getSquirtle = async() => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon/squirtle");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getSquirtle();
```

---
Todo:
* Adicionar imagens para facilitar a explicação
console.log('Início do exemplo');

setTimeout(() => {
    console.log('Esse log irá aparecer depois de 3 segundos');
}, 3000);

console.log('Esse log e o log abaixo irão aparecer antes do log dentro do setTimeOut');
console.log('Fim do exemplo');
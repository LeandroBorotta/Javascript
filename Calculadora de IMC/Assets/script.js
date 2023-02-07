
const calcular = document.querySelector('#calcular')
const reset = document.querySelector('#reset')

function imc(){
    const nome = document.querySelector('#name').value;
    const altura = document.querySelector("#altura").value;
    const peso = document.querySelector('#peso').value;
    const resultado = document.querySelector('#resultado')

    if(nome !== '' && altura !== '' && peso !== ''){
        
        const valorIMC = (peso / (altura * altura)).toFixed(2);
        let classificacao = '';
        if (valorIMC < 18.5){
            classificacao = 'abaixo do peso';
        } else if (valorIMC < 25) {
            classificacao = 'com peso ideal. Parabéns !!!';
        } else if (valorIMC < 30){
            classificacao = 'levemente acima do peso.';
        } else if (valorIMC < 35) {
            classificacao = 'obesidade com grau I.';
        } else if (valorIMC < 40) {
            classificacao = 'obesidade com grau II.';
        } else {
            classificacao = 'com obesidade grau III. CUIDADO!!!!';
        }

        resultado.innerHTML = `${nome} seu IMC é ${valorIMC} e você está ${classificacao}`
    } else {
        resultado.innerHTML = 'Preencha todos os campos!!!'
    }
}

calcular.addEventListener('click', imc);

function voltar(){
    const nome = document.querySelector('#name').value = '';
    const altura = document.querySelector("#altura").value = '';
    const peso = document.querySelector('#peso').value = '';
   resultado.innerHTML = '';
}

reset.addEventListener('click', voltar);
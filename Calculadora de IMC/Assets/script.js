
const calcular = document.querySelector('#calcular')
const reset = document.querySelector('#reset')

function imc(e){
    e.preventDefault()
    const nome = document.querySelector('#name').value;
    const altura = document.querySelector("#altura").value;
    const peso = document.querySelector('#peso').value;
    const resultado = document.querySelector('#resultado')
    let metros = altura/100
    if(nome !== '' && altura !== '' && peso !== ''){
        
        const valorIMC = (peso / (metros * metros)).toFixed(2);
        let classificacao = '';
        if (valorIMC < 16.0){
            classificacao = 'abaixo do peso muito grave';
        } else if (valorIMC >= 16.0 && valorIMC <= 16.99) {
            classificacao = 'abaixo do peso grave';
        } else if (valorIMC >= 17 && valorIMC <= 18.49 ){
            classificacao = 'baixo peso.';
        } else if (valorIMC >= 18.50 && valorIMC <= 24.99) {
            classificacao = 'Peso normal, parabêns !!!';
        } else if (valorIMC >= 25.0 && valorIMC <= 29.99) {
            classificacao = 'Sobrepeso';
        } else if (valorIMC >= 30.0 && valorIMC <= 34.99)  {
            classificacao = 'Obesidade nível I, tome cuidado!!';
        } else if (valorIMC >= 35.0 && valorIMC <= 40.0){
            classificacao = 'Obesidade nível II, Tome cuidado!!';
        } else{
            classificacao = 'Obesidade grau III, Tome cuidado!!';
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
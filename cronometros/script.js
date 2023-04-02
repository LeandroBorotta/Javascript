//Eventos e elementos
const spanNormal = document.querySelector('.span-normal')
const botaoIniciar = document.querySelector('.comecar').addEventListener('click', comecar)
const botaoParar = document.querySelector('.parar').addEventListener('click', parar)
const botaoZerar = document.querySelector('.zerar').addEventListener('click', zerar)

const spanRegre = document.querySelector('.span-regressivo')
//Variaveis globais
let seg = 0
let min = 0
let hr = 0
//funçções

function comecar(){ 
    inicio = setInterval(()=>{
    seg++

    if(seg === 60){
        seg = 0
        min ++
    } else if(min === 60){
        min = 0
        hr++
    }

spanNormal.innerHTML = `${corrigeNumero(hr)}:${corrigeNumero(min)}:${corrigeNumero(seg)}`
    console.log(seg)
}, 1000)
}


function parar(){
    clearInterval(inicio)  
}


function zerar(){
    seg = 0
    min = 0
    hr = 0
    clearInterval(inicio)
    spanNormal.innerHTML = `${corrigeNumero(hr)}:${corrigeNumero(min)}:${corrigeNumero(seg)}`
}


function corrigeNumero(temp){
    if(temp < 10){
        return '0'+temp
    } else{
        return temp
    }
}

function cronometroRegredir(temp){
    let hor =  Math.floor( temp / 3600) 
    let minu = Math.floor((temp % 3600) / 60);
    let segu = temp % 60

regredir = setInterval(()=>{

    if(segu > 0){
        segu--
    }

    if(segu === 0 && minu > 0){
        segu = 59
        minu--
       
    } else if(minu === 0 && hor > 0 ){
        minu = 59
        hor--
        
    } else if(hr === 0 && minu === 0 && segu === 0){
        clearInterval(regredir)
        alert('ACABOU!!!')
    }
    
    spanRegre.innerHTML = `${corrigeNumero(hor)}:${corrigeNumero(minu)}:${corrigeNumero(segu)}`

    }, 1000)

    
}


cronometroRegredir(parseInt(prompt('Digite o valor do cronometro regressivo em segundos: ')))

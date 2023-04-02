const bt = document.querySelector('#button')
const img = document.querySelector('img')
const body = document.querySelector('body')
const main = document.querySelector('main')
//Variáveis

//Eventos e funções
function ligar(){
    img.src = '/assets/imagens/ligada.jpg'
    body.style.backgroundColor = 'white'
    main.style.backgroundColor = 'white'

}
function desligar(){
    img.src = '/assets/imagens/desligada.jpg'
    body.style.backgroundColor = 'black'
    main.style.backgroundColor = 'black'

}
function quebrar(){
    img.src = '/assets/imagens/quebrada.jpg'
    bt.disabled = true
    img.removeEventListener('mouseover', ligar)
    img.removeEventListener('mouseleave', desligar)
}

bt.addEventListener('click', ()=>{
    if(bt.textContent == 'Ligar'){
        ligar();
        bt.textContent = 'Desligar'
    } else{
        desligar();
       bt.textContent = 'Ligar'
    }
})
img.addEventListener('dblclick', quebrar)
img.addEventListener('mouseover', ligar)
img.addEventListener('mouseleave', desligar)
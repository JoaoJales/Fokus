const html = document.querySelector('html')

const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const playBt = document.querySelector('#start-pause span')

const img = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const checkMusica = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const icon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const botoes = document.querySelectorAll('.app__card-button')
let tds = 1500
let intervaloId = null

checkMusica.addEventListener('change', ()=> {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})


focoBt.addEventListener('click', function(){
    tds = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', function(){
    tds = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', function(){
    tds = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){ //forEach :executa uma dada função em cada elemento de um array.
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src',`/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
             `
             
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML=
            `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = ()=>{
    if (tds <= 0){
        const musica = new Audio('/sons/beep.mp3').play()
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        } 
        zerar()
        return
    }
    tds--
    mostrarTempo()
}

playBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloId){
        zerar()
        const musica = new Audio('/sons/pause.mp3').play()
        return
    }else{
        const musicaPlay = new Audio('/sons/play.wav').play()
    }
    intervaloId = setInterval(contagemRegressiva , 1000) //Criando o temporizardor
    playBt.textContent = 'Pausar' 
    icon.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    playBt.textContent = 'Começar' 
    icon.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tds*1000)
    const tempoFormatado = tempo.toLocaleString('pt-br',{minute:'2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()
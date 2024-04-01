// Array para salvar os dados retornados da API
let exerciseDetails = [];
// Contador de index do array (Se tiver um valor salvo, usa o )
let contadorExerciseIndex = parseInt(localStorage.getItem('contadorExerciseIndex')) || -1
// Contador offSet da API (Se tiver um valor salvo, usa o localStorage)
let contadorApi = parseInt(localStorage.getItem('contadorOffsetApi')) || 0

// Função para limpar o localStorage 
// localStorage.clear()

// Função para chamar a API
function acessarApi() {
    // Definição de Url e Key da API
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=stretching&offset=${contadorApi}`
    const keyApi = '{YOUR_KEY}'

    // Setando configurações necessárias para acessar dados da Api
    const headers = {
        'X-Api-Key': keyApi,
        'Content-Type': 'application/json'
    }

    // Acessando API por meio do fetch()
    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            exerciseDetails = data.map(exercise => {
                return {
                    name: exercise.name,
                    difficulty: exercise.difficulty,
                    muscle: exercise.muscle,
                    instructions: exercise.instructions,
                }
            })
            console.log(exerciseDetails)
            console.log(`Valor do localStorage / offset: ${contadorApi}`)
        })
        .catch(error => console.error('Erro;', error))
}

// Função para renderizar os alongamentos na tela
let renderApi = document.getElementById('render_api')
function renderizarApi() {
    // Cada vez que a função for chamada o valor de contadorExerciseIndex é adicionado 1
    contadorExerciseIndex += 1
    // Salvando contadorExerciseIndex da API no localStorage 
    localStorage.setItem('contadorExerciseIndex', contadorExerciseIndex)
    console.log(`Valor do index do array: ${contadorExerciseIndex}`)

    // Criando elementos no HTML 
    let createH1name = document.createElement('h1')
    createH1name.setAttribute('id', 'h1-name')
    createH1name.textContent = `Exercise: ${exerciseDetails[contadorExerciseIndex].name}`
    renderApi.appendChild(createH1name)

    let createH3Difficulty = document.createElement('h3')
    createH3Difficulty.setAttribute('id', 'h3-difficulty')
    createH3Difficulty.textContent = `Difficulty: ${exerciseDetails[contadorExerciseIndex].difficulty}`
    renderApi.appendChild(createH3Difficulty)

    let createPInstructions = document.createElement('p')
    createPInstructions.setAttribute('id', 'p-instructions')
    createPInstructions.textContent = `Instructions: ${exerciseDetails[contadorExerciseIndex].instructions}`
    renderApi.appendChild(createPInstructions)

    // Quando o contadorExerciseIndex chegar ao Index[9]...
    if (contadorExerciseIndex >= 9) {
        // Offset da API é adicionado +10
        contadorApi += 10
        // ContadorExerciseIndex retorna a -1, para iniciar no index[0]
        contadorExerciseIndex = -1
        // Salvando offset da API no localStorage 
        localStorage.setItem('contadorOffsetApi', contadorApi)
        // Faz uma nova requisição a API 
        acessarApi()
    }
}

// Verificar se contadorExerciseIndex atingiu o valor de 9 antes de atualizar localStorage
window.onload = function() {
    if (contadorExerciseIndex >= 9) {
        contadorExerciseIndex = -1
        localStorage.setItem('contadorExerciseIndex', contadorExerciseIndex)
    }
}

// Criando o timer
const divTimer = document.getElementById('div_timer')
const btnDivTimer = document.getElementById('btn_div_timer')
const accessPomodoro = document.getElementById('access_pomodoro')
function criarTimer() {
    // Quando o botão de acesso é clicado, é feita a primeira chamada a API 
    acessarApi()

    // Criando elementos do timer na tela 
    let horas = document.createElement('h1')
    let separacaoOne = document.createElement('h1')
    let minutos = document.createElement('h1')
    let separacaoTwo = document.createElement('h1')
    let segundos = document.createElement('h1')

    horas.textContent = '00'
    separacaoOne.textContent = ':'
    minutos.textContent = '00'
    separacaoTwo.textContent = ':'
    segundos.textContent = '00'

    horas.setAttribute('id', 'timer_horas')
    minutos.setAttribute('id', 'timer_minutos')
    segundos.setAttribute('id', 'timer_segundos')

    divTimer.appendChild(horas)
    divTimer.appendChild(separacaoOne)
    divTimer.appendChild(minutos)
    divTimer.appendChild(separacaoTwo)
    divTimer.appendChild(segundos)

    // Chamada de função para criar os botões do timer 
    criarBtnTimer()
}

// Função para criar os botões do timer 
function criarBtnTimer() {

    // Criando elemento no tela
    let btnStartTimer = document.createElement('button')
    let btnStopTimer = document.createElement('button')
    let btnResetTimer = document.createElement('button')

    btnStartTimer.textContent = 'Start'
    btnStopTimer.textContent = 'Stop'
    btnResetTimer.textContent = 'Reset'

    btnStartTimer.setAttribute('onclick', 'startTimer()')
    btnStartTimer.setAttribute('id', 'start-timer')
    btnStopTimer.setAttribute('onclick', 'stopTimer()')
    btnStopTimer.setAttribute('id', 'stop-timer')
    btnResetTimer.setAttribute('onclick', 'resetTimer()')
    btnResetTimer.setAttribute('id', 'reset-timer')


    btnDivTimer.appendChild(btnStartTimer)
    btnDivTimer.appendChild(btnStopTimer)
    btnDivTimer.appendChild(btnResetTimer)

    // Escondendo div de acesso ao timer
    accessPomodoro.style.display = 'none'
}

// Função para capturar os Ids dos elementos 'Horas, Minutos e Segundos'
function capturarIdTimer() {
    let timerHoras = document.getElementById('timer_horas')
    let timerMinutos = document.getElementById('timer_minutos')
    let timerSegundos = document.getElementById('timer_segundos')

    // Retorno de variáveis para usar em outras funções
    return { timerHoras, timerMinutos, timerSegundos }
}

// Definindo valores padrões do timer 
let horas = 0
let minutos = 0
let segundos = 0
let timerIniciado = false

// Variável para parar o setInterval() 
let pararTimerSegundos

// Elemento onde aparece a mensagem do timer 
let mensagemStatus = document.getElementById('mensagem_status')

// Capturando container pelo id 
let container = document.getElementById('container')

// Função para iniciar o timer 
function startTimer() {
    // Importando o retorno da função capturarIdTimer() 
    let { timerMinutos, timerSegundos } = capturarIdTimer();

    // Se o timer não estiver com o status de iniciado... 
    if (!timerIniciado) {
        // É criado um 'h1' com o texto de 'Working...'
        let trabalhandoStatus = document.createElement('h1')
        trabalhandoStatus.textContent = 'Working...'
        trabalhandoStatus.setAttribute('id', 'working-status')
        mensagemStatus.appendChild(trabalhandoStatus)
    }
    // Definindo status como iniciado
    timerIniciado = true

    // Se o timer for iniciado... 
    if (timerIniciado) {
        // O botão para iniciar é escondido
        let btnStartTimer = document.getElementById('start-timer')
        btnStartTimer.style.display = 'none'
    }

    // Criando lógica para rodar o timer a cada segundo
    pararTimerSegundos = setInterval(() => {
        segundos += 1

        // Formatando números abaixo de 10 com o 0 a esquerda
        let segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
        timerSegundos.innerHTML = segundosFormatados

        // Quando 'segundos' atingir 59... 
        if (segundos === 59) {
            // 'segundos' retorna a -1 para iniciar no 0 
            segundos = -1
        }

        // Quando 'segundos' retornar a 0... 
        if (segundos === 0) {
            // 'minutos' adiciona mais 1
            minutos += 1
            // Formatando números abaixo de 10 com o 0 a esquerda
            let minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
            timerMinutos.innerHTML = minutosFormatados
        }

        // Quando faltar 10 segundos para o timer de trabalho finalizar... 
        if ((minutos == 24 && segundos > 49 && segundos % 2 == 0) || (minutos == 25 && segundos == 0)){
            // Mudamos o backgroundColor da pagina para 'rgb(102, 0, 0)' 
            container.style.backgroundColor = 'rgb(102, 0, 0)'
            // Chamando função de som 
            playSound()
        }
        // Se os segundos não forem par, o backgroundColor mantém original 
        else{
            container.style.backgroundColor = '#00141c'
        }

        // Quando o timer chegar a 25 minutos, é parado e chamada a função de intervalo de descanso
        if (minutos == 25 && segundos == 1) {
            startIntervaloDescanso();
        }

    }, 1000)

}

// Função para parar o timer
function stopTimer() {

    // Se o timer estiver com o status de iniciado... 
    if (timerIniciado) {
        // O botão para iniciar é renderizado 
        let btnStartTimer = document.getElementById('start-timer')
        btnStartTimer.style.display = 'initial'
    }

    // Função para para o setInterval() 
    clearInterval(pararTimerSegundos)
}

// Função para resetar o timer
function resetTimer() {

    // Importando o retorno da função capturarIdTimer() 
    let { timerHoras, timerMinutos, timerSegundos } = capturarIdTimer()

    // Se o timer estiver com o status de iniciado...
    if (timerIniciado) {
        // O botão para iniciar é renderizado
        let btnStartTimer = document.getElementById('start-timer')
        btnStartTimer.style.display = 'initial'
    }

    // Função para parar o timer 
    stopTimer()

    // Definindo valores padrões do timer 
    horas = 0
    minutos = 0
    segundos = 0
    
     // Formatando números abaixo de 10 com o 0 a esquerda
    let segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
    let minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    let horasFormatados = horas < 10 ? `0${horas}` : horas;

    // Renderizando números formatados na tela
    timerSegundos.innerHTML = segundosFormatados
    timerMinutos.innerHTML = minutosFormatados
    timerHoras.innerHTML = horasFormatados
}

// Função para remover o status de descanso
function statusTimer() {
    let removeStatus = document.getElementById('resting-status')
    mensagemStatus.removeChild(removeStatus)
    startTimer()
}

// Definindo valores padrões do timer de descanso
let segundosDescanco = 59
let minutosDescanco = 4
let horasDescanco = 0

// Variável para parar o setInterval() 
let pararSegundosDescanco

// Função para iniciar timer de descanso
function startIntervaloDescanso() {

    // Criando botão de descanso
    criarBtnDescanco()

    // Chamando função para renderizar valores da API na tela 
    renderizarApi()

    // Importando o retorno da função capturarIdTimer() 
    let { timerHoras, timerMinutos, timerSegundos } = capturarIdTimer()

    // Removendo status de trabalhando
    let removeStatus = document.getElementById('working-status')
    mensagemStatus.removeChild(removeStatus)

    // Criando e elemento e status de descansando 
    let descansandoStatus = document.createElement('h1')
    descansandoStatus.textContent = 'Resting...'
    descansandoStatus.setAttribute('id', 'resting-status')
    mensagemStatus.appendChild(descansandoStatus)

    // Definindo status de timer como não iniciado 
    timerIniciado = false

    // Chamando função para parar o timer 
    stopTimer()

     // Formatando números abaixo de 10 com o 0 a esquerda
    let segundosFormatados = segundosDescanco < 10 ? `0${segundosDescanco}` : segundosDescanco
    let minutosFormatados = minutosDescanco < 10 ? `0${minutosDescanco}` : minutosDescanco
    let horasFormatados = horasDescanco < 10 ? `0${horasDescanco}` : horasDescanco

    // Renderizando números formatados na tela
    timerSegundos.innerHTML = segundosFormatados
    timerMinutos.innerHTML = minutosFormatados
    timerHoras.innerHTML = horasFormatados

    // Criando lógica para rodar o timer de descanso a cada segundo
    pararSegundosDescanco = setInterval(() => {
        segundosDescanco -= 1

         // Formatando números abaixo de 10 com o 0 a esquerda
        let segundosFormatados = segundosDescanco < 10 ? `0${segundosDescanco}` : segundosDescanco
        // Renderizando números formatados na tela
        timerSegundos.innerHTML = segundosFormatados
        
        // Quando 'segundosDescanco' atingir 0 e minutosDescanco for maior que 0 ...  
        if (minutosDescanco > 0 && segundosDescanco === 0) {
            // 'segundosDescanco' retorna a 60
            segundosDescanco = 60
        }

        // Quando 'segundosDescanco' atingir 59...
        if (segundosDescanco === 59) {
            // 'minutosDescanco' abaixa 1
            minutosDescanco -= 1
             // Formatando números abaixo de 10 com o 0 a esquerda
            let minutosFormatados = minutosDescanco < 10 ? `0${minutosDescanco}` : minutosDescanco
            // Renderizando números formatados na tela
            timerMinutos.innerHTML = minutosFormatados
        }

        // Quando faltar 10 segundos para o timer de descanso finalizar... 
        if ((minutosDescanco == 0 && segundosDescanco < 11 && segundosDescanco % 2 == 0) || (minutosDescanco == 0 && segundosDescanco == 0)){
            // Mudamos o backgroundColor da pagina para 'rgb(102, 0, 0)' 
            container.style.backgroundColor = 'rgb(102, 0, 0)'
            // Chamando função de som 
            playSound()
        }
        // Se os segundos não forem par, o backgroundColor mantém original 
        else{
            container.style.backgroundColor = '#00141c'
        }

        // Se 'minutosDescanco' e 'segundosDescanco' chegar em 0, é chamada a função para parar o timer de descaso
        if (minutosDescanco === 0 & segundosDescanco === 0) {
            stopIntervaloDescanso()
        }
    }, 1000)

}

// Função para parar o timer de descaso
function stopIntervaloDescanso() {

    // Definindo valores padrões do timer 
    horas = 0
    minutos = 0
    segundos = 0

    segundosDescanco = 59
    minutosDescanco = 4
    horasDescanco = 0

    // Importando o retorno da função capturarIdTimer() 
    let { timerHoras, timerMinutos, timerSegundos } = capturarIdTimer()

    // Função para para o setInterval()
    clearInterval(pararSegundosDescanco)

    // Definindo valores padrões do timer 
    let segundosCorrigido = 0
    let minutosCorrigido = 0
    let horasCorrigida = 0

     // Formatando números abaixo de 10 com o 0 a esquerda e renderizando números formatados na tela
    let segundosFormatados = segundosCorrigido < 10 ? `0${segundosCorrigido}` : segundosCorrigido
    timerSegundos.innerHTML = segundosFormatados
    let minutosFormatados = minutosCorrigido < 10 ? `0${minutosCorrigido}` : minutosCorrigido
    timerMinutos.innerHTML = minutosFormatados
    let horasFormatados = horasCorrigida < 10 ? `0${horasCorrigida}` : horasCorrigida
    timerHoras.innerHTML = horasFormatados
}

// Função para criar botão de descanso
function criarBtnDescanco() {

    // Removendo botões de 'Start, Stop e Reset'
    btnStartTimer = document.getElementById('start-timer')
    btnStopTimer = document.getElementById('stop-timer')
    btnResetTimer = document.getElementById('reset-timer')
    btnDivTimer.removeChild(btnStartTimer)
    btnDivTimer.removeChild(btnStopTimer)
    btnDivTimer.removeChild(btnResetTimer)

    // Criando botão para finalizar o exercicio 
    let btnConcluirExercicio = document.createElement('button')
    btnConcluirExercicio.textContent = 'Exercise completed '
    btnConcluirExercicio.setAttribute('onclick', 'exercicioConcluido()')
    btnConcluirExercicio.setAttribute('id', 'exercicio-concluido')
    btnDivTimer.appendChild(btnConcluirExercicio)
}

// Função para finalizar o exercicio mostrado
function exercicioConcluido() {
    // Removendo botão de finalizar exercicio
    let btnConcluirExercicio = document.getElementById('exercicio-concluido')
    btnDivTimer.removeChild(btnConcluirExercicio)

    // Quando o botão de exercicio finalizado for clicado, retornamos o backgroundColor a cor padrão 
    container.style.backgroundColor = '#00141c'

    // Removendo exercicio renderizado na tela 
    let h1Name = document.getElementById('h1-name')
    renderApi.removeChild(h1Name)
    let h3Difficulty = document.getElementById('h3-difficulty')
    renderApi.removeChild(h3Difficulty)
    let pInstructions = document.getElementById('p-instructions')
    renderApi.removeChild(pInstructions)

    // Chamando função para parar descanso
    stopIntervaloDescanso()
    // Chamando função para parar criar novamente os botões do timer
    criarBtnTimer()
    // Chamando função para remover status de 'descansando' e iniciar o timer
    statusTimer()
}

// Função de som para segundo finais 
function playSound() {
    let audio = new Audio('./assets/somTimer.mp3')
    audio.play();
}

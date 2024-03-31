# README - Pomodoro Timer com Integração de API

Este projeto implementa um Timer Pomodoro com integração de API para buscar exercícios de alongamento. A Técnica Pomodoro é um método de gerenciamento de tempo que divide o trabalho em intervalos, tradicionalmente com duração de 25 minutos, separados por pequenos intervalos de descanso. O objetivo dessa técnica é aumentar a produtividade e o foco.

## Funcionalidades

- **Funcionalidade do Timer**: Fornece um timer para implementar a Técnica Pomodoro, com intervalos de trabalho e pausa personalizáveis.
- **Integração de API**: Utiliza uma API para buscar exercícios de alongamento, promovendo relaxamento e recarga de energia durante as pausas.
- **Exibição de Exercícios**: Renderiza os exercícios buscados da API na tela durante os intervalos de pausa.
- **Interação do Usuário**: Permite que os usuários iniciem, parem e resetem o timer, além de marcar exercícios como concluídos.

## Como Usar

1. **Acessar o Pomodoro Timer**: Clique no botão "Acessar" para iniciar o Timer Pomodoro.
2. **Controles do Timer**: Use os botões "Iniciar", "Parar" e "Resetar" para controlar o timer.
3. **Exibição de Exercícios**: Durante os intervalos de pausa, os exercícios de alongamento buscados da API são exibidos na tela.
4. **Conclusão de Exercícios**: Marque os exercícios como concluídos clicando no botão "Exercício concluído".

## Tecnologias Utilizadas

- **HTML**: Estrutura da página web.
- **CSS**: Estilização para a aparência visual.
- **JavaScript**: Lógica e funcionalidade do Timer Pomodoro e integração de API.

## Integração da API

O projeto utiliza a API Ninjas para buscar exercícios de alongamento. O endpoint da API usado neste projeto é:

```
https://api.api-ninjas.com/v1/exercises?type=stretching
```

## Notas Adicionais

- **LocalStorage**: O projeto utiliza o LocalStorage para armazenar e recuperar o índice de exercícios e o deslocamento da API, garantindo uma experiência contínua entre sessões.
- **Lógica do Timer**: A lógica do timer é implementada para lidar com intervalos de trabalho, intervalos de pausa e conclusão de exercícios.

Sinta-se à vontade para explorar o código e adaptá-lo às suas necessidades ou integrar recursos adicionais conforme necessário. Se encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para contribuir para o projeto.

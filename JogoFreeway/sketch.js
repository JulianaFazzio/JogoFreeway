// imagens e sons do jogo

let imagemDaEstrada;
let imagemDoCarro1;
let imagemDoCarro2;
let imagemDoCarro3;
let imagemDoAtor;
let somDaTrilha;
let somDaColisao;
let somDoPonto;

// variáveis do ator

let xAtor = 85;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;

// variáveis dos carros

let yCarros = [40, 96, 150, 210, 270, 318];
let xCarros = [600, 600, 600, 600, 600, 600];
let comprimentoDosCarros = 50;
let alturaDosCarros = 40;
let velocidadeDosCarros = [2, 2.5, 3.2, 5, 3.3, 2.3];



function preload(){
  imagemDaEstrada = loadImage ("imagens/estrada.png");
  imagemDoAtor = loadImage ("imagens/ator-1.png");
  imagemDoCarro1 = loadImage ("imagens/carro-1.png");
  imagemDoCarro2 = loadImage ("imagens/carro-2.png");
  imagemDoCarro3 = loadImage ("imagens/carro-3.png");
  imagemDosCarros = [imagemDoCarro1, imagemDoCarro2, imagemDoCarro3, imagemDoCarro1, imagemDoCarro2, imagemDoCarro3];
  somDaTrilha = loadSound("sons/trilha.mp3");
  somDaColisao = loadSound ("sons/colidiu.mp3");
  somDoPonto = loadSound ("sons/pontos.wav");
}

function setup() {
  createCanvas(500, 400);
  somDaTrilha.loop();
}

function draw() {
  background(imagemDaEstrada);
  mostraAtor();
  mostraCarro();
  movimentaCarro();
  movimentaAtor();
  voltaPosicaoInicialDoCarro();
  verificaColisao();
  incluiPontos();
  marcaPontos();
}

function mostraAtor(){
  image(imagemDoAtor, xAtor, yAtor, 30, 30)
}

function mostraCarro(){
  for (let i = 0; i < imagemDosCarros.length; i = i + 1){
   image(imagemDosCarros[i], xCarros[i], yCarros[i], comprimentoDosCarros, alturaDosCarros);
  }
}

function movimentaCarro(){
   for (let i = 0; i < imagemDosCarros.length; i = i +1){
    xCarros[i] -= velocidadeDosCarros[i];
   }
}

function movimentaAtor(){
  if (keyIsDown(UP_ARROW)){
    yAtor -= 3;
  }
  if (keyIsDown(DOWN_ARROW)){
    if (podeSemover()){
    yAtor += 3;
    }  
  }
}

function verificaColisao(){
  for (let i = 0; i < imagemDosCarros.length; i = i +1){
    colisao = collideRectCircle(xCarros[i], yCarros[i], comprimentoDosCarros, alturaDosCarros, xAtor, yAtor, 15)
    if (colisao){
      voltaAtorParaPosicaoInicial();
      somDaColisao.play();
      if(pontosMaiorQueZero()){
        meusPontos -= 1;
      }
    }
  }
}
function voltaAtorParaPosicaoInicial(){
  yAtor = 366;
}

function voltaPosicaoInicialDoCarro(){
  for (let i = 0; i < imagemDosCarros.length; i = i + 1){
    if (passouTodaATela(xCarros[i])){
    xCarros[i] = 600;
    }
  }
}

function passouTodaATela (xCarros){
  return xCarros < -50;
}

function incluiPontos(){
  textAlign(CENTER);
  textSize(25);
  fill(color(255,255,0));
  text(meusPontos, width/5, 27);
}

function marcaPontos(){
  if (yAtor < 15){
    meusPontos += 1;
    somDoPonto.play();
    voltaAtorParaPosicaoInicial();
  }
}

function pontosMaiorQueZero(){
  return meusPontos > 0;
}

function podeSemover(){
  return yAtor < 366;
}

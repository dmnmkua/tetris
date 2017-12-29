const row = document.querySelectorAll('.row');
const block = document.querySelectorAll('.block');
const startBtn = document.querySelector('#start');
const coinsField = document.querySelector('.coins');
// let startBlock;
let stopFunc = false;
let timer;
let coins;
let count;
let stop;
let data;
let n = 1;
let dotCount = 0;
let cubeCount = 0;
let startBlock = Math.round(row[0].children.length / 2);
let rotateCount;

//  Запуск игры
startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'disabled');
  coinsField.innerHTML = '0';
  coins = 0;
  timer = 500;
  events();
  let newGame = new Start();
});

//  Функция очистки поля
function restart() {
  alert('game over');
  startBtn.removeAttribute('disabled');
  for(let i = 0; i < block.length; i++) {
    if(block[i].classList.contains('disable')) {
      block[i].classList.remove('disable');
    }
    if(block[i].classList.contains('active')) {
      block[i].classList.remove('active');
    }
  }
}

//  Функция офистки всех лишних активных классов
function removeActive() {
  for(let i = 0; i < block.length; i++) {
    if(block[i].classList.contains('active')) {
      block[i].classList.remove('active');
    }
  }
}

//  Функция проверки заполнения линии
function testLine() {
  for(let i = 0; i < row.length; i++) {
    if(row[i].querySelectorAll('.disable').length === 10) {
      coinsField.innerHTML = coins += 100;
      for(let k = 0; k < row[i].children.length; k++) {
        row[i].children[k].classList.remove('disable');
      }
      for(let j = i; j > 0; j--) {
        for(let k = 0; k < row[j].children.length; k++) {
          if(row[j].children[k].classList.contains('disable')) {
            row[j].children[k].classList.remove('disable');
            row[j + 1].children[k].classList.add('disable')
          }
        }
      }
    }
  }
}

function events() {
  //  ADD
  window.addEventListener('keydown', ev => _eventFunc(ev))
}

function _eventFunc(ev) {
  //  точка влево
  if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('dotActive')
    && startBlock != 0
    && !row[count].children[startBlock - 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('dotActive');
    startBlock--;
    console.log('dot');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('dotActive');
  }
  //  куб влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('cubeActive')
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count + 1].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('cubeActive');
    startBlock--;
    console.log('cube');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('cubeActive');
  }
  //  фигура 1 влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('figOneActive')
    && startBlock != 1
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock - 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('figOneActive');
    startBlock--;
    console.log('figOne');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('figOneActive');
  }
  //  линия влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('lineActive')
    && startBlock != 0
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')
    && !row[count + 2].children[startBlock - 1].classList.contains('disable')
    && !row[count + 3].children[startBlock - 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count + 2].children[startBlock].classList.remove('active');
    row[count + 3].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('lineActive');
    startBlock--;
    console.log('line');
    row[count].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 2].children[startBlock].classList.add('active');
    row[count + 3].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('lineActive');
  }
  //  фигура 2 влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('figTwoActive')
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count + 1].children[startBlock + 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('figTwoActive');
    startBlock--;
    console.log('figTwo');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figTwoActive');
  }
  //  фигура 3 влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('figThreeActive')
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('figThreeActive');
    startBlock--;
    console.log('figThree');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('figThreeActive');
    }
  //  фигура 4 влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('figFourActive')
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock + 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('figFourActive');
    startBlock--;
    console.log('figFour');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figFourActive');
    }
  //  фигура 5 влево
  else if(ev.keyCode === 37
    && row[count].children[startBlock].classList.contains('figFiveActive')
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('figFiveActive');
    startBlock--;
    console.log('figFive');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('figFiveActive');
    }
  //  точка вправо
  if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('dotActive')
    && startBlock != row[0].children.length - 1
    && !row[count].children[startBlock + 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('dotActive');
    console.log('dot');
    startBlock++;
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('dotActive');
  }
  //  куб вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('cubeActive')
    && startBlock != row[0].children.length - 1
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count + 1].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('cubeActive');
    console.log('cube');
    startBlock++;
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('cubeActive');
  }
  //  фигура 1 вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('figOneActive')
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock - 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('figOneActive');
    console.log('figOne');
    startBlock++;
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('figOneActive');
  }
  //  линия вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('lineActive')
    && startBlock != row[0].children.length - 1
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')
    && !row[count + 2].children[startBlock + 1].classList.contains('disable')
    && !row[count + 3].children[startBlock + 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count + 2].children[startBlock].classList.remove('active');
    row[count + 3].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('lineActive');
    startBlock++;
    console.log('line');
    row[count].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 2].children[startBlock].classList.add('active');
    row[count + 3].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('lineActive');
  }
  //  фигура 2 вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('figTwoActive')
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 2].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count + 1].children[startBlock + 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('figTwoActive');
    startBlock++;
    console.log('figTwo');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figTwoActive');
  }
  //  фигура 3 вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('figThreeActive')
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('figThreeActive');
    startBlock++;
    console.log('figThree');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('figThreeActive');
  }
  //  фигура 4 вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('figFourActive')
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 2].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock + 1].classList.remove('active');
    row[count].children[startBlock].classList.remove('figFourActive');
    startBlock++;
    console.log('figFour');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figFourActive');
  }
  //  фигура 5 вправо
  else if(ev.keyCode === 39
    && row[count].children[startBlock].classList.contains('figFiveActive')
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock - 1].classList.remove('active');
    row[count].children[startBlock + 1].classList.remove('active');
    row[count + 1].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('figFiveActive');
    startBlock++;
    console.log('figFive');
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('figFiveActive');
  }
  if(ev.keyCode === 40) {
    n = .1;
  }
}


//  Конструктор запуска точки
function Start() {
  stop = true;
  count = 0;
  startBlock = Math.round(row[0].children.length / 2);

  x = Math.floor(Math.random() * 8);

  switch(x) {
    case 0:
      new Dot();
      break;
    case 1:
      new Cube();
      break;
    case 2:
      new FigOne();
      break;
    case 3:
      new Line();
      break;
    case 4:
      new FigTwo();
      break;
    case 5:
      new FigThree();
      break;
    case 6:
      new FigFour();
      break;
    case 7:
      new FigFive();
      break;
  }

}

//  Точка
//  []
function Dot() {
  console.log('dot');

  _dotFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('dotActive');
  }

  //  Функция запуска точки
  _down = () => {
    if(count < row.length - 1
      && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('dotActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('dotActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('dotActive');
      row[count].children[startBlock].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.0001;
      n = 1;
      dotCount++;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _dotFigure();
    _down();
  }

  _init();
}

//  Куб
//  [][]
//  [][]
function Cube() {
  console.log('cube');

  _cubeFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('cubeActive');
  }

  //  Функция запуска куба
  _down = () => {
    if(count < row.length - 2
      && !row[count + 2].children[startBlock].classList.contains('disable')
      && !row[count + 2].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('cubeActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('cubeActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('cubeActive');
      row[count].children[startBlock].classList.add('disable');
      row[count].children[startBlock - 1].classList.add('disable');
      row[count + 1].children[startBlock].classList.add('disable');
      row[count + 1].children[startBlock - 1].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      cubeCount++;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _cubeFigure();
    _down();
  }

  _init();
}

//  Фигура 1
//    [][]
//  [][]
function FigOne() {
  console.log('figOne');

  _figOneFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('figOneActive');
  }

  //  Функция запуска куба
  _down = () => {
    if(count < row.length - 2
      && !row[count + 2].children[startBlock].classList.contains('disable')
      && !row[count + 2].children[startBlock - 1].classList.contains('disable')
      && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      row[count].children[startBlock].classList.add('disable');
      row[count].children[startBlock + 1].classList.add('disable');
      row[count + 1].children[startBlock].classList.add('disable');
      row[count + 1].children[startBlock - 1].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _figOneFigure();
    _down();
  }

  _init();
}


//  Линия
//  []
//  []
//  []
//  []
function Line() {
  console.log('line');

  _lineFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 2].children[startBlock].classList.add('active');
    row[count + 3].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('lineActive');
  }

  //  Функция запуска куба
  _down = () => {
    if(count < row.length - 4
      && !row[count + 4].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 2].children[startBlock].classList.remove('active');
      row[count + 3].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 2].children[startBlock].classList.add('active');
      row[count + 3].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 2].children[startBlock].classList.remove('active');
      row[count + 3].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');
      row[count].children[startBlock].classList.add('disable');
      row[count + 1].children[startBlock].classList.add('disable');
      row[count + 2].children[startBlock].classList.add('disable');
      row[count + 3].children[startBlock].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _lineFigure();
    _down();
  }

  _init();
}


//  Фигура 2
//  [][]
//    [][]
function FigTwo() {
  console.log('figTwo');

  _figTwoFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figTwoActive');
  }

  //  Функция запуска фигуры 2
  _down = () => {
    if(count < row.length - 2
      && !row[count + 2].children[startBlock].classList.contains('disable')
      && !row[count + 1].children[startBlock - 1].classList.contains('disable')
      && !row[count + 2].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      row[count].children[startBlock].classList.add('disable');
      row[count].children[startBlock - 1].classList.add('disable');
      row[count + 1].children[startBlock].classList.add('disable');
      row[count + 1].children[startBlock + 1].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _figTwoFigure();
    _down();
  }

  _init();
}

// Фигура 3
// [][][]
// []
function FigThree() {
  console.log('figThree');

  _figThreeFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('figThreeActive');
  }

  //  Функция запуска фигуры 3
  _down = () => {
    if(count < row.length - 2
      && !row[count + 1].children[startBlock].classList.contains('disable')
      && !row[count + 1].children[startBlock + 1].classList.contains('disable')
      && !row[count + 2].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      row[count].children[startBlock].classList.add('disable');
      row[count].children[startBlock - 1].classList.add('disable');
      row[count].children[startBlock + 1].classList.add('disable');
      row[count + 1].children[startBlock - 1].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _figThreeFigure();
    _down();
  }

  _init();
}


// Фигура 4
// [][][]
//    []
function FigFour() {
  console.log('figFour');

  _figFourFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figFourActive');
  }

  //  Функция запуска фигуры 4
  _down = () => {
    if(count < row.length - 2
      && !row[count + 1].children[startBlock].classList.contains('disable')
      && !row[count + 2].children[startBlock + 1].classList.contains('disable')
      && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      row[count].children[startBlock].classList.add('disable');
      row[count].children[startBlock - 1].classList.add('disable');
      row[count].children[startBlock + 1].classList.add('disable');
      row[count + 1].children[startBlock + 1].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _figFourFigure();
    _down();
  }

  _init();
}


// Фигура 5
// [][][]
//  []
function FigFive() {
  console.log('figFive');

  _figFiveFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('figFiveActive');
  }

  //  Функция запуска фигуры 5
  _down = () => {
    if(count < row.length - 2
      && !row[count + 2].children[startBlock].classList.contains('disable')
      && !row[count + 1].children[startBlock + 1].classList.contains('disable')
      && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      row[count].children[startBlock].classList.add('disable');
      row[count].children[startBlock - 1].classList.add('disable');
      row[count].children[startBlock + 1].classList.add('disable');
      row[count + 1].children[startBlock].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = !stop;
      timer /= 1.01;
      n = 1;
      return Start();
    }

    if(stop) {
      setTimeout(_down.bind(this), timer * n);
    }
  }

  _init = () => {
    _figFiveFigure();
    _down();
  }

  _init();
}

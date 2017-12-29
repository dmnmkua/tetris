const row = document.querySelectorAll('.row');
const block = document.querySelectorAll('.block');
const startBtn = document.querySelector('#start');
const coinsField = document.querySelector('.coins');
let startBlock;
let stopFunc = false;
let timer;
let coins;


//  Запуск игры
startBtn.addEventListener('click', () => {
  coinsField.innerHTML = '0';
  coins = 0;
  timer = 200;
  let newGame = new BlockDot();
  startBtn.setAttribute('disabled', 'disabled');
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

//  События нажатий стрелок
function events() {
  window.addEventListener('keydown', e => {
    for(let i = 0; i < row.length; i++) {
      for(let j = 0; j < row[i].children.length; j++) {
        if(e.keyCode === 37
          && j != 0
          && !row[i].children[j - 1].classList.contains('disable')
          && row[i].children[j].classList.contains('active')) {
          row[i].children[j].classList.remove('active');
          j--;
          startBlock = j;
          console.log(j);
          row[i].children[j].classList.add('active');
        }
        if(e.keyCode === 39
          && j != row[0].children.length - 1
          && !row[i].children[j + 1].classList.contains('disable')
          && row[i].children[j].classList.contains('active')) {
          row[i].children[j].classList.remove('active');
          j++;
          startBlock = j;
          console.log(j);
          row[i].children[j].classList.add('active');
        }
      }
    }
  })
}

events();

//  Конструктор запуска точки
function BlockDot() {
  let stop = true;
  let count = 0;
  let time = 0;

  startBlock = Math.round(row[0].children.length / 2);

  dotFigure(count, startBlock)


  //  Функция запуска точки
  function down() {
    if(count < row.length - 1
      && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      count++;
      row[count].children[startBlock].classList.add('active');
    }
    else {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.add('disable');
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = false;
      timer /= 1.01;
      return BlockDot();
    }

    if(stop === true) {
      setTimeout(down, timer);
    }
  }

  down();
}

function dotFigure(count, startBlock) {
  row[count].children[startBlock].classList.add('active');
}

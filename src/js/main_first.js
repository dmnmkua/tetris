const row = document.querySelectorAll('.row');
const block = document.querySelectorAll('.block');
const startBtn = document.querySelector('#start');
const coinsField = document.querySelector('.coins');
// let timer = 100;
// let coins = 0;
let stopFunc = false;


//  Запуск игры
startBtn.addEventListener('click', () => {
  coinsField.innerHTML = '0';
  let newGame = new BlockDot(0, 200);
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
function testLine(coins) {
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

//  Конструктор запуска точки
function BlockDot(coins, timer) {
  let stop = true;
  let count = 0;
  let time = 0;
  let startBlock = Math.round(row[0].children.length / 2);

  row[count].children[startBlock].classList.add('active');


  //  События кнопок стрелок
  function events() {
    window.addEventListener('keydown', e => {
      if(e.keyCode === 37
        && startBlock != 0
        && !row[count].children[startBlock - 1].classList.contains('disable')
        && row[count].children[startBlock].classList.contains('active')) {
        row[count].children[startBlock].classList.remove('active');
        startBlock--;
        console.log(startBlock);
        row[count].children[startBlock].classList.add('active');
      }
      if(e.keyCode === 39
        && startBlock != row[0].children.length - 1
        && !row[count].children[startBlock + 1].classList.contains('disable')
        && row[count].children[startBlock].classList.contains('active')) {
        row[count].children[startBlock].classList.remove('active');
        startBlock++;
        console.log(startBlock);
        row[count].children[startBlock].classList.add('active');
      }
    })
  }

  events();

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
      testLine(coins);
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      stop = false;
      return BlockDot(coins, timer / 1.01);
    }

    if(stop === true) {
      setTimeout(down, timer);
    }
  }

  down();
}

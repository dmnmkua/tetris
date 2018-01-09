const field = document.querySelector('.field');
const row = document.querySelectorAll('.row');
const block = document.querySelectorAll('.block');
const startBtn = document.querySelector('#start');
const coinsField = document.querySelector('.coins');
const overlay = document.querySelector('.overlay');
const placeholderText = document.querySelector('.placeholder-text');
let timer;
let coins;
let count;
let data;
let n = 1;
let startBlock = Math.round(row[0].children.length / 2);
let rotateCount = 0;
let next = Math.floor(Math.random() * 8);

events();


//  Запуск игры
// window.addEventListener('keyDown', () => {
//   startBtn.setAttribute('disabled', 'disabled');
//   coinsField.innerHTML = '0';
//   coins = 0;
//   timer = 500;
//   // events();
//   let newGame = new Start();
// });

//  Функция очистки поля
function restart() {
  alert('game over');
  // startBtn.removeAttribute('disabled');
  placeholderText.style.opacity = '1';
  for(let i = 0; i < block.length; i++) {
    if(block[i].classList.contains('disable')) {
      block[i].classList.remove('disable');
    }
    if(block[i].classList.contains('active')) {
      block[i].classList.remove('active');
    }
  }
}

//  Очистка показа следующей фигуры
function clearNext() {
  block.forEach(block => {
    if(block.classList.contains('next')) {
      block.classList.remove('next');
    }
  })
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
  //  Delete overlay
  overlay.addEventListener('click', () => {
    overlay.classList.add('overlay--hide');
  })

  //  Запуск игры
  window.addEventListener('keydown', ev => {
    if(ev.keyCode === 13) {
      overlay.classList.add('overlay--hide');
      if(!field.querySelector('.active')) {
        placeholderText.style.opacity = '0';
        coinsField.innerHTML = '0';
        coins = 0;
        timer = 500;
        // events();
        let newGame = new Start();
      }
    }
  })

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
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('cubeActive');
  }


  //  фигура 1 влево
  else if(ev.keyCode === 37
  && row[count].children[startBlock].classList.contains('figOneActive')) {
    if(rotateCount % 2 === 0
    && startBlock != 1
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
    }
    else if(rotateCount % 2 === 1
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count - 1].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
    }
  }


  //  линия влево
  else if(ev.keyCode === 37
  && row[count].children[startBlock].classList.contains('lineActive')) {
    if(rotateCount % 2 === 0
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
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 2].children[startBlock].classList.add('active');
      row[count + 3].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
    }
    else if(rotateCount % 2 === 1
    && startBlock != 0
    && !row[count].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock + 2].classList.remove('active');
      row[count].children[startBlock + 3].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock + 2].classList.add('active');
      row[count].children[startBlock + 3].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
    }
  }


  //  фигура 2 влево
  else if(ev.keyCode === 37
  && row[count].children[startBlock].classList.contains('figTwoActive')) {
    if(rotateCount % 2 === 0
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
    }
    else if(rotateCount % 2 === 1
    && startBlock != 1
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')
    && !row[count].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
    }
  }


  //  фигура 3 влево
  else if(ev.keyCode === 37
  && row[count].children[startBlock].classList.contains('figThreeActive')) {
    if(rotateCount % 4 === 0
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 1
    && startBlock != 1
    && !row[count - 1].children[startBlock - 2].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 2
    && startBlock != 1
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 3
    && startBlock != 0
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
  }


  //  фигура 4 влево
  else if(ev.keyCode === 37
  && row[count].children[startBlock].classList.contains('figFourActive')) {
    if(rotateCount % 4 === 0
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 1
    && startBlock != 1
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 2
    && startBlock != 1
    && !row[count - 1].children[startBlock - 2].classList.contains('disable')
    && !row[count].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 3
    && startBlock != 0
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
  }


  //  фигура 5 влево
  else if(ev.keyCode === 37
  && row[count].children[startBlock].classList.contains('figFiveActive')) {
    if(rotateCount % 4 === 0
    && startBlock != 1
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 1
    && startBlock != 1
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock - 2].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 2
    && startBlock != 1
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock - 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 3
    && startBlock != 0
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock--;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
  }


  //  точка вправо
  if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('dotActive')
  && startBlock != row[0].children.length - 1
  && !row[count].children[startBlock + 1].classList.contains('disable')) {
    row[count].children[startBlock].classList.remove('active');
    row[count].children[startBlock].classList.remove('dotActive');
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
    startBlock++;
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('cubeActive');
  }


  //  фигура 1 вправо
  else if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('figOneActive')) {
    if(rotateCount % 2 === 0
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
    }
    else if(rotateCount % 2 === 1
    && startBlock != row[0].children.length - 1
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
    }
  }


  //  линия вправо
  else if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('lineActive')) {
    if(rotateCount % 2 === 0
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
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 2].children[startBlock].classList.add('active');
      row[count + 3].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
    }
    else if (rotateCount % 2 === 1
    && startBlock != row[0].children.length - 4
    && !row[count].children[startBlock + 4].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock + 2].classList.remove('active');
      row[count].children[startBlock + 3].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock + 2].classList.add('active');
      row[count].children[startBlock + 3].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
    }
  }


  //  фигура 2 вправо
  else if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('figTwoActive')) {
    if(rotateCount % 2 === 0
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
    }
    else if(rotateCount % 2 === 1
    && startBlock != row[0].children.length - 1
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
    }
  }


  //  фигура 3 вправо
  else if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('figThreeActive')) {
    if(rotateCount % 4 === 0
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 1
    && startBlock != row[0].children.length - 1
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 2
    && startBlock != row[0].children.length - 2
    && !row[count - 1].children[startBlock + 2].classList.contains('disable')
    && !row[count].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 3
    && startBlock != row[0].children.length - 2
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
  }


  //  фигура 4 вправо
  else if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('figFourActive')) {
    if(rotateCount % 4 === 0
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 1
    && startBlock != row[0].children.length - 1
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 2
    && startBlock != row[0].children.length - 2
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 3
    && startBlock != row[0].children.length - 2
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
  }


  //  фигура 5 вправо
  else if(ev.keyCode === 39
  && row[count].children[startBlock].classList.contains('figFiveActive')) {
    if(rotateCount % 4 === 0
    && startBlock != row[0].children.length - 2
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 1
    && startBlock != row[0].children.length - 1
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 2
    && startBlock != row[0].children.length - 2
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 2].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 3
    && startBlock != row[0].children.length - 2
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      startBlock++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
  }

  //  Ускорение падения фигуры
  if(ev.keyCode === 40) {
    n = .1;
  }


  //  Поворот фигура 1
  if(ev.keyCode === 38
  && row[count].children[startBlock].classList.contains('figOneActive')) {
    if(rotateCount % 2 === 0
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');

      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
      rotateCount++;
    }
    else if(rotateCount % 2 === 1
    && startBlock < row[0].children.length - 1
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
      rotateCount++;
    }
  }


  //  Поворот фигура 2
  if(ev.keyCode === 38
  && row[count].children[startBlock].classList.contains('figTwoActive')) {
    if(rotateCount % 2 === 0
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
      rotateCount++;
    }
    else if(rotateCount % 2 === 1
    && startBlock < row[0].children.length - 1
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
      rotateCount++;
    }
  }


  //  Поворот линия
  if(ev.keyCode === 38
  && row[count].children[startBlock].classList.contains('lineActive')) {
    if(rotateCount % 2 === 0
    && startBlock < row[0].children.length - 3
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock + 2].classList.contains('disable')
    && !row[count].children[startBlock + 3].classList.contains('disable')
    && count < row.length - 3) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 2].children[startBlock].classList.remove('active');
      row[count + 3].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock + 2].classList.add('active');
      row[count].children[startBlock + 3].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
      rotateCount++;
    }
    else if(rotateCount % 2 === 1
    && count < row.length - 3
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count + 2].children[startBlock].classList.contains('disable')
    && !row[count + 3].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock + 2].classList.remove('active');
      row[count].children[startBlock + 3].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');

      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 2].children[startBlock].classList.add('active');
      row[count + 3].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
      rotateCount++;
    }
  }


  //  Поворот фигура 3
  if(ev.keyCode === 38
  && row[count].children[startBlock].classList.contains('figThreeActive')) {
    if(rotateCount % 4 === 0
    && startBlock < row[0].children.length - 1
    && startBlock != 1
    && count != row.length - 2
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');

      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 1
    && count < row.length - 1
    && startBlock < row[0].children.length - 1
    && startBlock != 1
    && count != row.length - 2
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 2
    && startBlock < row[0].children.length - 1
    && startBlock != 1
    && count != row.length - 1
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 3
    && startBlock < row[0].children.length - 1
    && startBlock != 1
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
      rotateCount++;
    }
  }


  //  Поворот фигура 4
  if(ev.keyCode === 38
  && row[count].children[startBlock].classList.contains('figFourActive')) {
    if(rotateCount % 4 === 0
    && startBlock < row[0].children.length - 1
    && count != row.length - 2
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 1
    && count < row.length - 1
    && startBlock < row[0].children.length - 1
    && count != row.length - 1
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count - 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 2
    && startBlock < row[0].children.length - 1
    && startBlock != 0
    && count != row.length - 1
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count - 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 3
    && startBlock < row[0].children.length - 1
    && startBlock != 0
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
      rotateCount++;
    }
  }


  //  Поворот фигура 5
  if(ev.keyCode === 38
  && row[count].children[startBlock].classList.contains('figFiveActive')) {
    if(rotateCount % 4 === 0
    && startBlock != row[0].children.length - 1
    && startBlock > 0
    && count != row.length - 2
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 1
    && count < row.length - 1
    && startBlock < row[0].children.length - 1
    && startBlock > 0
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 2
    && startBlock < row[0].children.length - 1
    && startBlock != 0
    && count != row.length - 1
    && !row[count - 1].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');

      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
      rotateCount++;
    }
    else if(rotateCount % 4 === 3
    && startBlock < row[0].children.length - 1
    && startBlock != 0
    && !row[count].children[startBlock - 1].classList.contains('disable')
    && !row[count].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');

      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
      rotateCount++;
    }
  }
}


//  Конструктор запуска точки
function Start() {
  timer /= 1.001;
  n = 1;
  count = 0;
  rotateCount = 0;
  startBlock = Math.round(row[0].children.length / 2);

  x = Math.floor(Math.random() * 8);

  console.log(x);
  showNext(x);

  switch(next) {
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

  next = x;

  // new Line()

}

//  Точка
//  []
function Dot() {

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
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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

  _figOneFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('figOneActive');
  }

  //  Функция запуска фигуры 1
  _down = () => {
    if(count < row.length - 2
      && rotateCount % 2 === 0
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
    else if(count < row.length - 2
      && rotateCount % 2 === 1
      && !row[count + 2].children[startBlock].classList.contains('disable')
      && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figOneActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figOneActive');
    }
    else {
      if(rotateCount % 2 === 0) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figOneActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock - 1].classList.add('disable');
      }
      else if(rotateCount % 2 === 1) {
        row[count].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count - 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figOneActive');
        row[count].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count - 1].children[startBlock - 1].classList.add('disable');
      }

      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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

  _lineFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count + 2].children[startBlock].classList.add('active');
    row[count + 3].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('lineActive');
  }

  //  Функция запуска линии
  _down = () => {
    if(count < row.length - 4
      && rotateCount % 2 === 0
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
    else if(count < row.length - 1
      && rotateCount % 2 === 1
      && !row[count + 1].children[startBlock].classList.contains('disable')
      && !row[count + 1].children[startBlock + 1].classList.contains('disable')
      && !row[count + 1].children[startBlock + 2].classList.contains('disable')
      && !row[count + 1].children[startBlock + 3].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock + 2].classList.remove('active');
      row[count].children[startBlock + 3].classList.remove('active');
      row[count].children[startBlock].classList.remove('lineActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock + 2].classList.add('active');
      row[count].children[startBlock + 3].classList.add('active');
      row[count].children[startBlock].classList.add('lineActive');
    }
    else {
      if(rotateCount % 2 === 0) {
        row[count].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count + 2].children[startBlock].classList.remove('active');
        row[count + 3].children[startBlock].classList.remove('active');
        row[count].children[startBlock].classList.remove('lineActive');
        row[count].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count + 2].children[startBlock].classList.add('disable');
        row[count + 3].children[startBlock].classList.add('disable');
      }
      else if(rotateCount % 2 === 1) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock + 2].classList.remove('active');
        row[count].children[startBlock + 3].classList.remove('active');
        row[count].children[startBlock].classList.remove('lineActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count].children[startBlock + 2].classList.add('disable');
        row[count].children[startBlock + 3].classList.add('disable');
      }
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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
      && rotateCount % 2 === 0
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
    else if(count < row.length - 2
      && rotateCount % 2 === 1
      && !row[count + 2].children[startBlock - 1].classList.contains('disable')
      && !row[count + 1].children[startBlock].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figTwoActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figTwoActive');
    }
    else {
      if(rotateCount % 2 === 0) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figTwoActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock + 1].classList.add('disable');
      }
      else if(rotateCount % 2 === 1) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count + 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figTwoActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count + 1].children[startBlock - 1].classList.add('disable');
      }

      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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

  _figThreeFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock].classList.add('figThreeActive');
  }

  //  Функция запуска фигуры 3
  _down = () => {
    if(rotateCount % 4 === 0
    && count < row.length - 2
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
    else if(rotateCount % 4 === 1
    && count != row.length - 2
    && !row[count + 2].children[startBlock].classList.contains('disable')
    && !row[count].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 2
    && count != row.length - 1
    && !row[count + 1].children[startBlock ].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else if(rotateCount % 4 === 3
    && count != row.length - 2
    && !row[count + 2].children[startBlock].classList.contains('disable')
    && !row[count + 2].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figThreeActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figThreeActive');
    }
    else {
      if(rotateCount % 4 === 0) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count + 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figThreeActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count + 1].children[startBlock - 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 1) {
        row[count].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figThreeActive');
        row[count].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock - 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 2) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count - 1].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('lineActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count - 1].children[startBlock + 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 3) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figThreeActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock + 1].classList.add('disable');
      }
      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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

  _figFourFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock + 1].classList.add('active');
    row[count].children[startBlock].classList.add('figFourActive');
  }

  //  Функция запуска фигуры 4
  _down = () => {
    if(rotateCount % 4 === 0
      && count < row.length - 2
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
    else if(rotateCount % 4 === 1
    && count < row.length - 2
    && !row[count + 2].children[startBlock].classList.contains('disable')
    && !row[count + 2].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 2
      && count < row.length - 1
      && !row[count + 1].children[startBlock + 1].classList.contains('disable')
      && !row[count + 1].children[startBlock].classList.contains('disable')
      && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count - 1].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count - 1].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else if(rotateCount % 4 === 3
      && count < row.length - 2
      && !row[count + 2].children[startBlock].classList.contains('disable')
      && !row[count].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFourActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFourActive');
    }
    else {
      if(rotateCount % 4 === 0) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count + 1].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFourActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count + 1].children[startBlock + 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 1) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFourActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock - 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 2) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count - 1].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFourActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count - 1].children[startBlock - 1].classList.add('disable');
      }
      else if (rotateCount % 4 === 3) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFourActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock + 1].classList.add('disable');
      }

      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
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

  _figFiveFigure = () => {
    row[count].children[startBlock].classList.add('active');
    row[count].children[startBlock - 1].classList.add('active');
    row[count].children[startBlock + 1].classList.add('active');
    row[count + 1].children[startBlock].classList.add('active');
    row[count].children[startBlock].classList.add('figFiveActive');
  }

  //  Функция запуска фигуры 5
  _down = () => {
    if(rotateCount % 4 === 0
    && count < row.length - 2
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
    else if(rotateCount % 4 === 1
    && count < row.length - 2
    && !row[count + 2].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 2
    && count < row.length - 1
    && !row[count + 1].children[startBlock - 1].classList.contains('disable')
    && !row[count + 1].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count].children[startBlock - 1].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count].children[startBlock - 1].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else if(rotateCount % 4 === 3
    && count < row.length - 2
    && !row[count + 2].children[startBlock].classList.contains('disable')
    && !row[count + 1].children[startBlock + 1].classList.contains('disable')) {
      row[count].children[startBlock].classList.remove('active');
      row[count - 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock + 1].classList.remove('active');
      row[count + 1].children[startBlock].classList.remove('active');
      row[count].children[startBlock].classList.remove('figFiveActive');
      count++;
      row[count].children[startBlock].classList.add('active');
      row[count - 1].children[startBlock].classList.add('active');
      row[count].children[startBlock + 1].classList.add('active');
      row[count + 1].children[startBlock].classList.add('active');
      row[count].children[startBlock].classList.add('figFiveActive');
    }
    else {
      if(rotateCount % 4 === 0) {
        row[count].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFiveActive');
        row[count].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
      }
      else if(rotateCount % 4 === 1) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFiveActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 2) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count].children[startBlock - 1].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFiveActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count].children[startBlock - 1].classList.add('disable');
      }
      else if(rotateCount % 4 === 3) {
        row[count].children[startBlock].classList.remove('active');
        row[count - 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock + 1].classList.remove('active');
        row[count + 1].children[startBlock].classList.remove('active');
        row[count].children[startBlock].classList.remove('figFiveActive');
        row[count].children[startBlock].classList.add('disable');
        row[count - 1].children[startBlock].classList.add('disable');
        row[count].children[startBlock + 1].classList.add('disable');
        row[count + 1].children[startBlock].classList.add('disable');
      }

      testLine();
      if(row[0].querySelector('.disable')) {
        return restart();
      }
      return Start();
    }

    setTimeout(_down.bind(this), timer * n);
  }

  _init = () => {
    _figFiveFigure();
    _down();
  }

  _init();
}

function showNext(x) {

  clearNext();

  if(x === 0) {
    row[1].children[1].classList.add('next');
  }
  else if(x === 1) {
    row[0].children[0].classList.add('next');
    row[0].children[1].classList.add('next');
    row[1].children[0].classList.add('next');
    row[1].children[1].classList.add('next');
  }
  else if(x === 2) {
    row[0].children[1].classList.add('next');
    row[0].children[2].classList.add('next');
    row[1].children[0].classList.add('next');
    row[1].children[1].classList.add('next');
  }
  else if(x === 3) {
    row[0].children[0].classList.add('next');
    row[1].children[0].classList.add('next');
    row[2].children[0].classList.add('next');
    row[3].children[0].classList.add('next');
  }
  else if(x === 4) {
    row[0].children[0].classList.add('next');
    row[0].children[1].classList.add('next');
    row[1].children[1].classList.add('next');
    row[1].children[2].classList.add('next');
  }
  else if(x === 5) {
    row[0].children[0].classList.add('next');
    row[0].children[1].classList.add('next');
    row[0].children[2].classList.add('next');
    row[1].children[0].classList.add('next');
  }
  else if(x === 6) {
    row[0].children[0].classList.add('next');
    row[0].children[1].classList.add('next');
    row[0].children[2].classList.add('next');
    row[1].children[2].classList.add('next');
  }
  else if(x === 7) {
    row[0].children[0].classList.add('next');
    row[0].children[1].classList.add('next');
    row[0].children[2].classList.add('next');
    row[1].children[1].classList.add('next');
  }
}

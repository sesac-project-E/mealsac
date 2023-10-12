const randomInit = document.querySelector('.random-container');
const startRandomBtn = document.querySelector('#randomStartBtn');
const randomResultBtn = document.querySelector('#randomResultBtn');
const randomBorders = document.querySelectorAll('.random-border');
const form = document.forms['random'];
const inputs = document.querySelectorAll('input');
const randomStartBtn = document.querySelector('#randomStartBtn');
const randomIntro = document.querySelector('#random-intro');
const randomQuestion = document.querySelector('#random-question');
const randomNextBtn = document.querySelector('#randomNextBtn');
const options = document.querySelector('.options');
const randomResultForm = document.querySelector('.random-result');
const toMainBtn = document.querySelector('#toMainBtn');
const toRandomBtn = document.querySelector('#toRandomBtn');

let currQuestion = 0;
const question = document.querySelector('.question');

const questionForm = [
  {
    question: '자신이 생각하는 최대 점심값',
    name: 'money',
    options: [
      {
        value: 0,
        label: '돈이 많다.',
        eng: 'rich',
        src: '../../static/img/random/rich.png',
      },
      {
        value: 1,
        label: '돈이 중간.',
        eng: 'middle',
        src: '../../static/img/random/middle.png',
      },
      {
        value: 2,
        label: '돈이 적다.',
        eng: 'poor',
        src: '../../static/img/random/poor.png',
      },
    ],
  },
  {
    question: '같이 먹는 사람 수는?',
    name: 'people',
    options: [
      {
        value: 0,
        label: '혼자',
        eng: 'solo',
        src: '../../static/img/random/solo.png',
      },
      {
        value: 1,
        label: '많이',
        eng: 'many',
        src: '../../static/img/random/many.png',
      },
    ],
  },
  {
    question: '친근한 맛? or 새로운 도전?',
    name: 'taste',
    options: [
      {
        value: 0,
        label: '친근한 맛',
        eng: 'familiar',
        src: '../../static/img/random/familiar.png',
      },
      {
        value: 1,
        label: '새로운 도전',
        eng: 'new',
        src: '../../static/img/random/new.png',
      },
    ],
  },
];
const imgSrcs = {
  korean: '../../static/img/random/korean.jpeg',
  street: '../../static/img/random/street.jpeg',
  chinese: '../../static/img/random/chinese.jpeg',
  cafe: '../../static/img/random/cafe.jpeg',
  dessert: '../../static/img/random/dessert.jpeg',
  japanese: '../../static/img/random/japanese.jpeg',
  fast: '../../static/img/random/fast.jpeg',
  meat: '../../static/img/random/meat.jpeg',
  pub: '../../static/img/random/pub.jpeg',
  convenience: '../../static/img/random/convenience.jpeg',
  chicken: '../../static/img/random/chicken.jpeg',
  pork: '../../static/img/random/pork.jpeg',
  western: '../../static/img/random/western.jpeg',
};

const submitForm = {
  money: '',
  people: '',
  taste: '',
};

function randomNext() {
  if (currQuestion == 2) {
    if (submitForm['taste'] === '') {
      window.alert('하나를 선택해주세요');
    } else {
      randomEnd();
      return;
    }
  } else if (currQuestion === 1) {
    if (submitForm['people'] === '') {
      window.alert('하나를 선택해주세요');
    } else {
      randomNextBtn.classList.remove('bg-green-hover');
      randomNextBtn.classList.add('bg-blue-hover');
      randomNextBtn.innerText = '결과 보기';
      nextInit();
      addInputs();
    }
  } else {
    if (submitForm['money'] === '') {
      window.alert('하나를 선택해주세요');
    } else {
      randomNextBtn.classList.remove('bg-blue-hover');
      randomNextBtn.classList.add('bg-green-hover');
      randomNextBtn.innerText = '다음';
      nextInit();
      addInputs();
    }
  }
}

function randomStart() {
  if (window.screen.width > 768) {
    randomBorders[3].style.display = 'block';
    randomBorders[0].style.animation = 'colDelete 1000ms forwards';
    randomBorders[1].style.animation = 'moveRowRight 1000ms forwards';
    randomBorders[2].style.animation = 'moveRowRight 1000ms forwards';
  }
  randomInit.style.setProperty('--beforeDisplay', 'none');
  randomInit.style.setProperty('--afterDisplay', 'block');
  startRandomBtn.style.display = 'none';
  randomIntro.setAttribute('class', 'none');
  randomIntro.style.display = 'none';
  randomQuestion.style.display = 'block';
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.justifyContent = 'space-around';
  form.style.width = '100%';
  form.style.minHeight = '100%';
}

function randomEnd() {
  if (!(submitForm.money && submitForm.people && submitForm.taste)) {
    return;
  }
  form.remove();
  if (window.screen.width > 768) {
    randomBorders[1].style.animation = 'fillFullContainer 1000ms forwards';
    randomBorders[2].style.animation = 'fillFullContainer 1000ms forwards';
    randomBorders[0].style.animation = 'col 1000ms forwards';
    randomBorders[0].style.animationDelay = '250ms';
  }
  randomQuestion.style.display = 'none';
  randomResultForm.style.display = 'flex';
  randomResultForm.style.width = '100%';
  const { money, people, taste } = submitForm;
  const result = money + people + taste;
  const resultMessage = document.createElement('h1');
  toMainBtn.style.display = 'block';
  toRandomBtn.style.display = 'block';
  const img = document.createElement('img');
  img.style.width = '15rem';
  randomResultForm.append(img);
  switch (result) {
    case 'richsolofamiliar':
      resultMessage.innerText = '고기구이을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['meat']}`);
      break;
    case 'richsolonew':
      resultMessage.innerText = '족발을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['pork']}`);
      break;
    case 'richmanyfamiliar':
      resultMessage.innerText = '일식을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['japanese']}`);
      break;
    case 'richmanynew':
      resultMessage.innerText = '중식을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['chinese']}`);

      break;
    case 'middlesolofamiliar':
      resultMessage.innerText = '한식을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['korean']}`);

      break;
    case 'middlesolonew':
      resultMessage.innerText = '양식을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['western']}`);
      break;
    case 'middlemanyfamiliar':
      resultMessage.innerText = '치킨을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['chicken']}`);

      break;
    case 'middlemanynew':
      resultMessage.innerText = '펍을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['pub']}`);
      break;
    case 'poorsolofamiliar':
      resultMessage.innerText = '편의점을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['convenience']}`);

      break;
    case 'poorsolonew':
      resultMessage.innerText = '디저트을 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['dessert']}`);

      break;
    case 'poormanyfamiliar':
      resultMessage.innerText = '패스트푸드를 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['fast']}`);

      break;
    case 'poormanynew':
      resultMessage.innerText = '카페를 추천합니다!';
      randomResultForm.append(resultMessage);
      img.setAttribute('src', `${imgSrcs['cafe']}`);
      break;
    default:
      return;
  }
}

function randomResult() {
  randomInit.style.setProperty('--beforeDisplay', 'block');
  randomInit.style.setProperty('--afterDisplay', 'none');
  startRandomBtn.style.display = 'block';
  randomResultBtn.style.display = 'none';
}

function addInputs() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(elem => {
    elem.addEventListener('click', e => {
      submitForm[e.target.name] = e.target.value;
      inputs.forEach(elem => {
        const pa = elem.parentElement.parentElement;
        if (pa.style.backgroundColor === 'gray') {
          pa.style.backgroundColor = '';
        }
      });
      const el = e.target;
      const p = el.parentElement.parentElement;
      p.style.backgroundColor = 'gray';
    });
  });
}

function nextInit() {
  const options = document.querySelector('.options');
  currQuestion = (currQuestion + 1) % 3;
  question.innerHTML = questionForm[currQuestion].question;
  let name = questionForm[currQuestion].name;
  const allOptions = document.querySelectorAll('.option');
  allOptions.forEach(el => {
    el.remove();
  });
  for (let i = 0; i < questionForm[currQuestion].options.length; i++) {
    const option = document.createElement('div');
    option.classList.add('option');
    const label1 = document.createElement('label');
    label1.setAttribute('for', questionForm[currQuestion].options[i].eng);
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', name);
    input.setAttribute('name', name);
    input.setAttribute('value', questionForm[currQuestion].options[i].eng);
    input.setAttribute('id', questionForm[currQuestion].options[i].eng);
    input.classList.add('input-none');
    label1.appendChild(input);
    const img = document.createElement('img');
    img.setAttribute('src', questionForm[currQuestion].options[i].src);
    label1.appendChild(img);
    option.appendChild(label1);
    const label2 = document.createElement('label');
    label2.setAttribute('for', questionForm[currQuestion].options[i].eng);
    label2.innerText = `${questionForm[currQuestion].options[i].label}`;
    option.appendChild(label2);
    options.appendChild(option);
  }
}

addInputs();

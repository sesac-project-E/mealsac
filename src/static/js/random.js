const randomInit = document.querySelector(".random-container")
const startRandomBtn = document.querySelector("#randomStartBtn")
const randomResultBtn = document.querySelector("#randomResultBtn")
const randomBorders = document.querySelectorAll(".random-border")
const form = document.forms["random"]
const inputs = document.querySelectorAll("input")
const randomStartBtn = document.querySelector("#randomStartBtn")
const randomIntro = document.querySelector("#random-intro")
const randomQuestion = document.querySelector("#random-question")
const randomNextBtn = document.querySelector("#randomNextBtn")
const randomPrevBtn = document.querySelector("#randomPrevBtn")
const options = document.querySelector(".options")
randomPrevBtn.style.display = 'none'

let currQuestion = 0
const question = document.querySelector(".question")

const questionForm = [
  {
    "question" : "자신이 생각하는 최대 점심값",
    "name" : "money",
    "options" : [
      {
        "value" : 0,
        "label" : "돈이 많다.",
        "eng" : "rich",
        "src" : "../../static/img/random/rich.png"
      },
      {
        "value" : 1,
        "label" : "돈이 중간.",
        "eng" : "middle",
        "src" : "../../static/img/random/middle.png"
      },
      {
        "value" : 2,
        "label" : "돈이 적다.",
        "eng" : "poor",
        "src" : "../../static/img/random/poor.png"
      }
    ] 
  },
  {
    "question" : "같이 먹는 사람 수는?",
    "name" : "people",
    "options" : [
      {
        "value" : 0,
        "label" : "혼자",
        "eng" : "solo",
        "src" : "../../static/img/random/solo.png"
      },
      {
        "value" : 1,
        "label" : "많이",
        "eng" : "many",
        "src" : "../../static/img/random/many.png"
      }
    ] 
  },
  {
    "question" : "친근한 맛? or 새로운 도전?",
    "name" : "taste",
    "options" : [
      {
        "value" : 0,
        "label" : "친근한 맛",
        "eng" : "familiar",
        "src" : "../../static/img/random/familiar.png"
      },
      {
        "value" : 1,
        "label" : "새로운 도전",
        "eng" : "new",
        "src" : "../../static/img/random/new.png"

      }
    ] 
  }
]

randomInit.animate(
  [
    { opacity: 0.5, easing: "ease-out" },
    { opacity: 1 },
  ],
  1000,
);


function randomNext () {
  randomPrevBtn.style.display = 'block'
  if (currQuestion == 2) {
    console.log("결과 도출")
    randomPrevBtn.setAttribute('')
    return ;
  }
  if (currQuestion === 1) {
    randomNextBtn.classList.remove('bg-green-hover')
    randomNextBtn.classList.add('bg-blue-hover')
    randomNextBtn.innerText = '결과 보기'
  } else {
    randomNextBtn.classList.remove('bg-blue-hover')
    randomNextBtn.classList.add('bg-green-hover')
    randomNextBtn.innerText = '다음'
  }
  nextInit()
  addInputs()
}

function randomPrev () {
  if (currQuestion === 0) {
    randomPrevBtn.classList.add('disabled')
    randomPrevBtn.classList.remove('bg-gray-hover')
    return ;
  } else {
    randomPrevBtn.classList.remove('disabled')
    randomPrevBtn.classList.add('bg-gray-hover')
  }
  randomNextBtn.classList.remove('bg-blue-hover')
  randomNextBtn.classList.add('bg-green-hover')
  randomNextBtn.innerText = '다음'
  prevInit()
  addInputs()
}

function randomStart() {
  randomBorders[3].style.display = 'block'
  randomBorders[0].style.animation = 'colDelete 1000ms forwards'
  randomBorders[1].style.animation = 'moveRowRight 1000ms forwards' 
  randomBorders[2].style.animation = 'moveRowRight 1000ms forwards' 
  randomInit.style.setProperty('--beforeDisplay', 'none')
  randomInit.style.setProperty('--afterDisplay', 'block')
  startRandomBtn.style.display = 'none'
  randomIntro.setAttribute('class', 'none')
  randomIntro.style.display = 'none'
  randomQuestion.style.display = 'block'
  form.style.display = 'block'
}

function randomResult() {
  randomInit.style.setProperty('--beforeDisplay', 'block')
  randomInit.style.setProperty('--afterDisplay', 'none')
  startRandomBtn.style.display = 'block'
  randomResultBtn.style.display = 'none'
}

function addInputs () {
  const inputs = document.querySelectorAll("input")
  inputs.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      console.log(e.target.value)
      inputs.forEach((elem) => {
        const pa = elem.parentElement.parentElement
        if (pa.style.backgroundColor === 'gray') {
          pa.style.backgroundColor = ""
        }
      })
      const el = e.target
      const p = el.parentElement.parentElement
      p.style.backgroundColor = 'gray';
    })
  });
}

function nextInit() {
  const options = document.querySelector(".options")
  currQuestion = (currQuestion + 1) % 3
  question.innerHTML = questionForm[currQuestion].question
  let name = questionForm[currQuestion].name
  const allOptions =document.querySelectorAll(".option")
  allOptions.forEach((el) => {
    el.remove()
  })
  for (let i = 0; i < questionForm[currQuestion].options.length; i++) {
    const option = document.createElement('div')
    option.classList.add('option')
    const label1 = document.createElement('label')
    label1.setAttribute("for", questionForm[currQuestion].options[i].eng)
    const input = document.createElement('input')
    input.setAttribute("type", "radio")
    input.setAttribute("name", name)
    input.setAttribute("name", name)
    input.setAttribute("value", questionForm[currQuestion].options[i].eng)
    input.setAttribute("id", questionForm[currQuestion].options[i].eng)
    input.classList.add('input-none')
    label1.appendChild(input)
    const img = document.createElement('img')
    img.setAttribute("src", questionForm[currQuestion].options[i].src)
    label1.appendChild(img)
    option.appendChild(label1)
    const label2 = document.createElement('label')
    label2.setAttribute("for", questionForm[currQuestion].options[i].eng)
    label2.innerText = `${questionForm[currQuestion].options[i].label}`
    option.appendChild(label2)
    options.appendChild(option)
  }
  
}



function prevInit() {
  currQuestion = ((currQuestion - 1) < 0 ? 2 : (currQuestion - 1)) % 3
  question.innerHTML = questionForm[currQuestion].question
  const options = document.querySelector(".options")
  let name = questionForm[currQuestion].name
  const allOptions = document.querySelectorAll(".option")
  allOptions.forEach((el) => {
    el.remove()
  })
  for (let i = 0; i < questionForm[currQuestion].options.length; i++) {
    const option = document.createElement('div')
    option.classList.add('option')
    const label1 = document.createElement('label')
    label1.setAttribute("for", questionForm[currQuestion].options[i].eng)
    const input = document.createElement('input')
    input.setAttribute("type", "radio")
    input.setAttribute("name", name)
    input.setAttribute("name", name)
    input.setAttribute("value", questionForm[currQuestion].options[i].eng)
    input.setAttribute("id", questionForm[currQuestion].options[i].eng)
    input.classList.add('input-none')
    label1.appendChild(input)
    const img = document.createElement('img')
    img.setAttribute("src", questionForm[currQuestion].options[i].src)
    label1.appendChild(img)
    option.appendChild(label1)
    const label2 = document.createElement('label')
    label2.setAttribute("for", questionForm[currQuestion].options[i].eng)
    label2.innerText = `${questionForm[currQuestion].options[i].label}`
    option.appendChild(label2)
    options.appendChild(option)
  }
}

addInputs()
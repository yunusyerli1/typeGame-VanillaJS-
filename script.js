const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;
//Set difficulty value 
let difficulty = localStorage.getItem('difficulty') !== null ? 
  localStorage.getItem('difficulty') : 'medium';

  //Set difficulty select value
  difficultySelect.value = localStorage.getItem('difficulty') !== null ? 
  localStorage.getItem('difficulty') : 'medium';

//Focus on text on beginning
text.focus();

//update Time
const updateTime = () => {
  time--;
  timeEl.innerHTML = time + 's';
  if(time === 0){
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word
const getRandomWord = () => {
  return words[Math.floor(Math.random()*words.length)];
}

//Add word to DOM
const addWordToDom = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//Update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
  if(score === 5 && difficulty =='easy'){
    difficultySelect.value ='medium';
    }
  if(score === 5 && difficulty == 'medium'){
    difficultySelect.value ='hard';
  }
}


//Game over
const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time run out</h1>
    <p>Your final score ${score}</p>
    <button onclick= "location.reload()">Reload</button>
  `;
  endgameEl.style.display='flex';
}
addWordToDom();

//Event Listeners

text.addEventListener('input', e => {
  const insertedText = e.target.value;
  
  if(insertedText === randomWord){
    addWordToDom();
    updateScore();
    //Clear
  e.target.value = '';
  if(difficulty === 'hard'){
    time +=2;
  }else if (difficulty === 'medium'){
    time += 3;
  }else{
  time+=5;
}
  updateTime();
  }
  
});
//Settings click
settingsBtn.addEventListener('click', ()=> {
  settings.classList.toggle('hide');
});

//Setting mode select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})
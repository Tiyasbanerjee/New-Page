const calendar = document.getElementById('calender');

const weekdaysData = {
  1: "sun.png",
  2: "moon.png",
  3: "star.png",
  4: "wet.png",
  5: "thus.png",
  6: "fry.png",
  7: "sat.png" 
};

const FirstDayOfTheMonth = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.getDay()+1;
}

const MounthDays = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.getDate();
}


for(let row =1; row<=7; row++){
  // Create a box for each day of the week
  const box = document.createElement('div');

  box.classList.add('week-days');
  box.style.backgroundImage = `url(${weekdaysData[row]})`;

  calendar.appendChild(box);

  let CellBoxCol = 0;

  for(let col=0; col<=5; col++){
    CellBoxCol = row + col * 7;

    // Create a box for each day

    const cellBox = document.createElement('div');
    cellBox.classList.add('cell');
    cellBox.id = `cell-num-${CellBoxCol}`;
    cellBox.textContent = CellBoxCol;
    calendar.appendChild(cellBox);

    
  }
}

//empty them
for(let cellNum = 1; cellNum <= 42; cellNum++){
  const cell = document.getElementById(`cell-num-${cellNum}`);
  cell.textContent = '';
};

//calculate the range
let date = 1;
let firstday = FirstDayOfTheMonth();
let totalDays = MounthDays();
let lastday = totalDays + firstday-1;
// now fill them
for(let cell=firstday; cell<=lastday; cell++){
  const cellElement = document.getElementById(`cell-num-${cell}`);
  cellElement.textContent = date;
  date++;
}



// Nasa image part---

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)

.then(response => response.json())
.then(data=>{
  const mediaType = data.media_type;
  if(mediaType === 'image'){
    const NewsBox = document.getElementById('news-box');
    NewsBox.style.backgroundImage = `url(${data.url})`;
  }
})




// clock logic-->

function clock(){
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
};


clock();
setInterval(clock, 1000);


// fetch News

// news functions

const FEEDS = [
    'https://news.mit.edu/rss/feed',
    'https://news.mit.edu/rss/topic/science',
    'https://news.mit.edu/rss/topic/technology',
    'https://news.mit.edu/rss/topic/artificial-intelligence2'
];

// defining functions

function hash_news(feedUrl) {
  let hash = 0;
  for(let i=0; i<feedUrl.length; i++){
    const char = feedUrl.charCodeAt(i);
    hash = (hash<<5)-hash + char;
    hash |= 0; 
  }
  return Math.abs(hash);
}

function CheakLocalStorage(hash){
  const output = localStorage.getItem(hash);
  return output !== null;
}
function FetchLocalStorage(hash){
  const data = localStorage.getItem(hash);
  return data;
}
function SaveLocalStorage(hash, data){
  localStorage.setItem(hash, data);
}

function loadNews(){



}

function cheakDB(){
  const today = new Date();
  const date = today.getDate();
  if(localStorage.getItem('Date') !== String(date)){
    localStorage.clear();
    localStorage.setItem('Date', String(date));
    loadNews();
  }
  return 1;
}
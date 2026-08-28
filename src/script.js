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

// defining functions

function CheakLocalStorage(key){
  const output = localStorage.getItem(key);
  return output !== null;
}
function FetchLocalStorage(key){
  const data = localStorage.getItem(key);
  return data;
}
function SaveLocalStorage(key, data){
  localStorage.setItem(key, data);
}

async function loadNews(){
  let newsnumber = 0;
    
    const feedUrl = 'https://news.mit.edu/rss/feed' ;
    
    let rssUrl = encodeURIComponent(feedUrl);
    let apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    
    try {

        console.log(`Fetching news from ${feedUrl}...`);

        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status === 'ok') {
          console.log(`Successfully fetched news from ${feedUrl}.`);
          }

        data.items.forEach((item) => {
        
          newsnumber++;

        const title = item.title;
        const link = item.link;
        const description = item.description;
      
        SaveLocalStorage(newsnumber, JSON.stringify({ title, link, description }));
      }) 
  }catch (error) {
    console.error(`Error fetching news from ${feedUrl}:`, error);
  }

  SaveLocalStorage('newsnumber', newsnumber);

};

function cheakDB(){
  const today = new Date();
  const date = today.getDate();
  if(localStorage.getItem('Date') !== String(date)){
    localStorage.clear();
    localStorage.setItem('Date', String(date));
    loadNews();
  }
}

cheakDB();

// save the url of nasa pic and fetch only when needed

if(CheakLocalStorage('nasa_pic_url')){
  const NewsBox = document.getElementById('news-box');
  NewsBox.style.backgroundImage = `url(${FetchLocalStorage('nasa_pic_url')})`;
}else{
  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)

  .then(response => response.json())
  .then(data=>{
  const mediaType = data.media_type;
  if(mediaType === 'image'){
  const NewsBox = document.getElementById('news-box');
  NewsBox.style.backgroundImage = `url(${data.url})`;
  SaveLocalStorage('nasa_pic_url', data.url);
  }

})
}



// config the shearch engines

const shearchBars = document.querySelectorAll('.search-bar');

const searchEngines = {
  google: 'https://www.google.com/search?q=',
  brave: 'https://search.brave.com/search?q=',
  googleAi: 'https://www.google.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  bing: 'https://www.bing.com/search?q=',
  yahoo: 'https://search.yahoo.com/search?p=',
  Perplexity: 'https://www.perplexity.ai/search?q=',
  youtube: 'https://www.youtube.com/results?search_query='
}

shearchBars.forEach((bar) => {
  bar.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      const query = bar.value;
      const searchEngine = bar.id;
      window.location.href = `${searchEngines[searchEngine]}${encodeURIComponent(query)}`;
      bar.value = '';
    }
  });
});

// showing news.
const newsBox = document.getElementById('news-box');
for(let i=1; i<=Number(FetchLocalStorage('newsnumber')); i++){
  const newsData = JSON.parse(FetchLocalStorage(i));

  newsBox.innerHTML += `<div class="news-card">
    <h3>${newsData.title}</h3>
    <p>${newsData.description}</p>
    <a href="${newsData.link}" target="_self" rel="noopener noreferrer">Read more</a>
  </div>`;

}
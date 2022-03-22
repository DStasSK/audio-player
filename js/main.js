// создание основных переменных
const boomBox = document.querySelector('.boom'),
      songName = document.querySelector('.song__JS'),
      progressZone = document.querySelector('.progress__zone'),
      progress = document.querySelector('.progress'),
      back = document.querySelector('.back'),
      play = document.querySelector('.play'),
      next = document.querySelector('.next'),
      audio = document.querySelector('.audio');

// названия песен
const playList = ['iPhone - rington',
                  'Minions - boooka (remix)',
                  'CS - O camper camper',
                  'Frank Sinatra - New York, New York',
                  'La-La (Навсикая из долины ветров)',
                  'My Generation – The Who (Форма голоса)'];



// Инициализация значений по умолчнанию
let songIndex = -1;
function loadMix(a) {
   audio.src = 'audio/' + a + '.mp3';
   songName.innerHTML = a;
   if (songIndex < 0){
      songName.innerHTML = 'no sound data';
      audio.src = 'audio/';
   }
}
loadMix(playList[songIndex]);



// play & pause - активация конопки
function Play() {
   // запуск аудио файла
   audio.play();
   // добавление класса active
   boomBox.classList.add('active');
   play.classList.add('active');
}
function Pause() {
   audio.pause();
   boomBox.classList.remove('active');
   play.classList.remove('active');
}



// addEventListener - обработчик событий
play.addEventListener('click', () => {
   if (songIndex < 0){
      songIndex = 0;
      loadMix(playList[songIndex]);
   }

   // проверка на наличие класса active
   const isPlaying = play.classList.contains('active');
   if (isPlaying) {Pause()}
   else {Play()};
})



// Перемотка - активация конпок
function Next() {
   songIndex++;
   if(songIndex > playList.length - 1){songIndex = 0}
   loadMix(playList[songIndex]);
   Play();
}
function Back() {
   songIndex--;
   if(songIndex < 0){songIndex = playList.length - 1}
   loadMix(playList[songIndex]);
   Play();
}
// запуск функций next-back при клике
next.addEventListener('click', Next);
back.addEventListener('click', Back);



// автоперемотка
// ended - стандартный обработчик для audio
audio.addEventListener('ended', Next);



// Анимация Progress Bar
function updateProgress(b) {
   const {duration, currentTime} = b.srcElement;
   // duration длительность трека, currentTime - текущее время
   progress.style.width = currentTime / duration * 100 + '%';
}
// отображение прогресса трека
// timeupdate - стандартный обработчик для audio
audio.addEventListener('timeupdate', updateProgress);



// установка прогресса кликом
function setProgress(c) {
   // считывание ширины
   const widthProgressZone = this.clientWidth;
   // считывание координаты клика по оси Х
   const clickX = c.offsetX;
   // считывание длительности трека
   const duration = audio.duration;

   // перемотка пропорционально месту клика от ширины
   audio.currentTime = clickX / widthProgressZone * duration;
}
// запуск функции setProgress при клике
progressZone.addEventListener('click', setProgress);

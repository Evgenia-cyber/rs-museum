const video = document.querySelector('.video');
const progressVideo = document.querySelector('.progress-video');
const progressVolume = document.querySelector('.progress-volume');
const mainPlayBtn = document.querySelector('#main-play');
const playBtn = document.querySelector('#play');
const volumeBtn = document.querySelector('#volume');
const fullscreenBtn = document.querySelector('#fullscreen');

/* ********************* */

const togglePlay = () => {
  if (video.paused || video.ended) {
    video.play();
    playBtn.classList.replace('play', 'pause');
    mainPlayBtn.style.display = 'none';
  } else {
    video.pause();
    playBtn.classList.replace('pause', 'play');
    mainPlayBtn.style.display = 'block';
  }
};

function updateProgressAndVideoOnRewind(event) {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

  video.pause();
  video.currentTime = (value * video.duration) / 100;
  video.play();
}

const updateProgressVideo = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressVideo.value = percent;
  progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`;
};

/* ********************* */

playBtn.addEventListener('click', togglePlay);

mainPlayBtn.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', updateProgressVideo);

progressVideo.addEventListener('input', updateProgressAndVideoOnRewind);

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

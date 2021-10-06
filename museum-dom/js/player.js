const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressVideo = document.querySelector('.progress-video');
const progressVolume = document.querySelector('.progress-volume');
const mainPlayBtn = document.querySelector('#main-play');
const playBtn = document.querySelector('#play');
const volumeBtn = document.querySelector('#volume');
const fullscreenBtn = document.querySelector('#fullscreen');

/* ********************* */

const paintProgressBackground = (currentValueInPercent) => {
  return `linear-gradient(to right, #710707 ${MIN_PERCENT}%, #710707 ${currentValueInPercent}%, #c4c4c4 ${currentValueInPercent}%, #c4c4c4 ${MAX_PERCENT}%)`;
};

/* ********************* */

const togglePlay = () => {
  if (video.paused) {
    if (progressVideo.value === MAX_PERCENT.toString()) {
      progressVideo.value = MIN_PERCENT.toString();
      video.currentTime = 0;
    }

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
  this.style.background = paintProgressBackground(value);
  const videoCurrentTime = (value * video.duration) / MAX_PERCENT;
  video.currentTime = videoCurrentTime;

  if (!video.paused) {
    video.pause();
    video.currentTime = videoCurrentTime;
    video.play();
  }
}

const updateProgressVideo = () => {
  const percent = Math.round(
    (video.currentTime / video.duration) * MAX_PERCENT,
  );
  progressVideo.value = percent;
  progressVideo.style.background = paintProgressBackground(percent);

  if (percent === MAX_PERCENT) {
    video.pause();
    playBtn.classList.replace('pause', 'play');
    mainPlayBtn.style.display = 'block';
  }
};

const toggleVolume = () => {
  if (video.muted) {
    video.muted = false;
    volumeBtn.classList.replace('mute', 'volume');
    progressVolume.value = DEFAULT_VOLUME * MAX_PERCENT;
    progressVolume.style.background = paintProgressBackground(
      DEFAULT_VOLUME * MAX_PERCENT,
    );
  } else {
    video.muted = true;
    volumeBtn.classList.replace('volume', 'mute');
    progressVolume.value = MIN_VOLUME;
    progressVolume.style.background = paintProgressBackground(MIN_VOLUME);
  }
};

const updateProgressAndVideoVolume = () => {
  const value = progressVolume.value;

  progressVolume.style.background = paintProgressBackground(value);

  video.volume = value / MAX_PERCENT;
  if (value === '0') {
    volumeBtn.classList.replace('volume', 'mute');
  } else {
    volumeBtn.classList.replace('mute', 'volume');
  }
};

const toggleFullscreen = () => {
  if (fullscreenBtn.classList.contains('fullscreen')) {
      fullscreenBtn.classList.replace('fullscreen', 'not-fullscreen');
  } else {
    fullscreenBtn.classList.replace('not-fullscreen', 'fullscreen');
  }
};

const toggleIsFullscreen = () => {
  if (fullscreenBtn.classList.contains('fullscreen')) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  } else {
    player.requestFullscreen();
  }
};

/* ********************* */

playBtn.addEventListener('click', togglePlay);

mainPlayBtn.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', updateProgressVideo);

progressVideo.addEventListener('input', updateProgressAndVideoOnRewind);

volumeBtn.addEventListener('click', toggleVolume);

progressVolume.addEventListener('input', updateProgressAndVideoVolume);

fullscreenBtn.addEventListener('click', toggleIsFullscreen);

player.addEventListener('fullscreenchange', toggleFullscreen);

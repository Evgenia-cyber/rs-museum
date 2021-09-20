const progressVideo = document.querySelector('.progress-video');

progressVideo.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

const progressVolume = document.querySelector('.progress-volume');

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
});

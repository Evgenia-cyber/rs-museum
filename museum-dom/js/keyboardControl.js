/* *********управление плеером с клавиатуры********* */

document.addEventListener('keyup', (event) => {
  const isFormActive = popup.classList.contains('active');

  // Пробел — пауза / play
  if (!isFormActive && event.code === 'Space') {
    event.preventDefault();
    event.stopPropagation();
    togglePlay();
  }

  // Клавиша M (англ) — отключение/включение звука
  if (!isFormActive && event.code === 'KeyM') {
    toggleVolume();
  }

  // Клавиша F — включение/выключение полноэкранного режима
  if (!isFormActive && event.code === 'KeyF') {
    toggleIsFullscreen();
  }

  // Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика
  if (!isFormActive && event.code === 'Comma' && event.shiftKey) {
    changeVideoRate(FASTER);
  }

  // Клавиши SHIFT+. (англ) — замедление воспроизведения ролика
  if (!isFormActive && event.code === 'Period' && event.shiftKey) {
    changeVideoRate(SLOWER);
  }

  if (isFormActive && event.code === 'Enter') {
    formSubmitHandler(event);
  }
});

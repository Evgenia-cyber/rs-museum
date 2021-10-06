/* *********управление плеером с клавиатуры********* */

document.addEventListener('keyup', (event) => {

  // Пробел — пауза / play
  if (event.code === 'Space') {
    togglePlay();
  }

  // Клавиша M (англ) — отключение/включение звука
  if (event.code === 'KeyM') {
    toggleVolume();
  }

  // Клавиша F — включение/выключение полноэкранного режима
  if (event.code === 'KeyF') {
    toggleIsFullscreen();
  }

  // Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика
  if (event.code === 'Comma' && event.shiftKey) {
    changeVideoRate(FASTER);
  }

  // Клавиши SHIFT+. (англ) — замедление воспроизведения ролика
  if (event.code === 'Period' && event.shiftKey) {
    changeVideoRate(SLOWER);
  }

  player.focus();
});

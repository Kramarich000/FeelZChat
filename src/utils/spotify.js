function toggleSpotify() {
  const player = document.getElementById('spotifyPlayer');
  const button = event.target;
  if (player.style.display === 'none') {
    player.style.display = 'block';
    button.textContent = '♪ Скрыть плеер';
  } else {
    player.style.display = 'none';
    button.textContent = '♪ Показать плеер';
  }
}

const songs = [
  {
    name: "song1",
    title: "First Song",
    artist: "Artist 1"
  },
  {
    name: "song2",
    title: "Second Song",
    artist: "Artist 2"
  },
  {
    name: "song3",
    title: "Third Song",
    artist: "Artist 3"
  }
];

let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

let isPlaying = false;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `music/${song.name}.mp3`;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerText = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerText = "▶️";
}

function togglePlayPause() {
  isPlaying ? pauseSong() : playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    const mins = Math.floor(audio.currentTime / 60);
    const secs = Math.floor(audio.currentTime % 60);
    currentTimeEl.innerText = `${mins}:${secs < 10 ? "0" + secs : secs}`;

    const dmins = Math.floor(audio.duration / 60);
    const dsecs = Math.floor(audio.duration % 60);
    durationEl.innerText = `${dmins}:${dsecs < 10 ? "0" + dsecs : dsecs}`;
  }
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function setVolume(val) {
  audio.volume = val;
}

// Autoplay next song
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgress);

// Load first song
loadSong(songs[songIndex]);

// Build playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  playlistEl.appendChild(li);
});

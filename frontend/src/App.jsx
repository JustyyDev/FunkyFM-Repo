import React, { useState } from 'react';
import './App.css';

// List your MP3 files here (relative to public/music/ or src/music/)
// Example: add your files like 'music/song1.mp3', 'music/song2.mp3'
const playlist = [
  // 'music/song1.mp3',
  // 'music/song2.mp3',
];

function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const hasPlaylist = Array.isArray(playlist) && playlist.length > 0;

  const handleNext = () => {
    if (!hasPlaylist) return;
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };
  const handlePrev = () => {
    if (!hasPlaylist) return;
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="main-container">
      <header>
        <h1>Funky FM</h1>
        <p className="subtitle">The Radio Station for FNF Modders & Fans!</p>
        <nav>
          <a href="#home">Home</a> | <a href="#playlist">Playlist</a> | <a href="#schedule">Schedule</a> | <a href="#contact">Contact</a>
        </nav>
      </header>
      <section id="home">
        <h2>Welcome to Funky FM!</h2>
        <p>
          Funky FM is your go-to radio for Friday Night Funkin' modders and fans! Enjoy curated tracks, community submissions, and the best of FNF-inspired music.
        </p>
      </section>
      <section id="playlist">
        <h2>Now Playing</h2>
        {hasPlaylist ? (
          <div className="player">
            <p><strong>{playlist[currentTrack].split('/').pop()}</strong></p>
            <audio
              controls
              autoPlay
              src={playlist[currentTrack]}
              onEnded={handleNext}
              style={{ width: '100%' }}
            >
              Your browser does not support the audio element.
            </audio>
            <div className="player-controls">
              <button onClick={handlePrev}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
            <ul className="playlist-list">
              {playlist.map((track, idx) => (
                <li key={track} style={{ fontWeight: idx === currentTrack ? 'bold' : 'normal' }}>
                  <button onClick={() => setCurrentTrack(idx)}>{track.split('/').pop()}</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No tracks found!<br />
            <span style={{fontSize:'0.95em'}}>Add MP3s to <code>frontend/music/</code> and list them in <code>App.jsx</code> like:<br /><code>const playlist = ['music/song1.mp3', 'music/song2.mp3'];</code></span>
          </p>
        )}
      </section>
      <section id="schedule">
        <h2>Show Schedule</h2>
        <ul>
          <li>12:00 - 14:00: Modder's Morning</li>
          <li>14:00 - 16:00: Fan Funk Hour</li>
          <li>16:00 - 18:00: Remix Rush</li>
        </ul>
      </section>
      <section id="contact">
        <h2>Contact & Submit Your Track</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Message or Track Link" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      <footer>
        <p>&copy; {new Date().getFullYear()} Funky FM | Made for the FNF Community</p>
      </footer>
    </div>
  );
}

export default App;

# Melodic — Music Player Web App

A web-based music player with playlist functionality, search, genre filtering, and full playback controls.

## Features

- Play, pause, skip next/previous
- Shuffle and repeat (none / all / one)
- Seek by clicking the progress bar
- Volume control with mute toggle
- Keyboard shortcuts: Space (play/pause), → (next), ← (prev), M (mute), R (repeat), S (shuffle)
- Browse and filter by genre
- Search tracks by title, artist, or album
- Playlist support — click a playlist to load and play its tracks
- Now Playing card with animated equalizer
- Real audio playback for first 5 tracks (SoundHelix public domain MP3s)
- Fully responsive — sidebar hides on mobile, genre pills appear instead

## Tech Stack

React 18 · Vite · Tailwind CSS · HTML5 Audio API · Context API

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Keyboard Shortcuts

| Key   | Action             |
| ----- | ------------------ |
| Space | Play / Pause       |
| →     | Next track         |
| ←     | Previous track     |
| M     | Toggle mute        |
| R     | Cycle repeat mode  |
| S     | Toggle shuffle     |

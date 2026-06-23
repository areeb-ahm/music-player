import { usePlayer } from '../../context/PlayerContext'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'

export default function PlayerBar() {
  const { currentTrack, isPlaying } = usePlayer()

  return (
    <div className="player-bar-bg glass fixed bottom-0 left-0 right-0 px-8 py-5 z-50"
      style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-screen-xl mx-auto">
        <ProgressBar />
        <div className="flex items-center gap-4 mt-2">

          <div className="flex items-center gap-3 w-1/4 min-w-0">
            <div className={`w-14 h-14 rounded-xl shrink-0 transition-transform ${isPlaying ? 'animate-glow-pulse' : ''}`}
              style={{
                background: currentTrack?.cover,
                boxShadow: isPlaying ? '0 2px 12px rgba(0,0,0,0.4)' : 'var(--shadow-sm)'
              }} />
            <div className="min-w-0">
              <p style={{ color: isPlaying ? 'var(--accent-light)' : 'var(--text-primary)' }}
                className="text-base font-bold truncate transition-colors">{currentTrack?.title}</p>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm truncate mt-0.5">{currentTrack?.artist}</p>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <PlayerControls />
          </div>

          <div className="w-1/4 flex justify-end">
            <VolumeControl />
          </div>

        </div>
      </div>
    </div>
  )
}

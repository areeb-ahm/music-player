import { usePlayer } from '../../context/PlayerContext'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'

export default function PlayerBar() {
  const { currentTrack } = usePlayer()

  return (
    <div
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}
      className="fixed bottom-0 left-0 right-0 px-6 py-3 z-50"
    >
      <div className="max-w-screen-xl mx-auto">
        <ProgressBar />
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-3 w-1/4 min-w-0">
            <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: currentTrack?.cover }} />
            <div className="min-w-0">
              <p style={{ color: 'var(--text-primary)' }} className="text-sm font-medium truncate">{currentTrack?.title}</p>
              <p style={{ color: 'var(--text-secondary)' }} className="text-xs truncate">{currentTrack?.artist}</p>
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

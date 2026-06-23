import { usePlayer } from '../../context/PlayerContext'
import { PLAYLISTS, GENRES, TRACKS } from '../../data/tracks'
import NowPlayingCard from '../Player/NowPlayingCard'

export default function PlaylistSidebar() {
	const { selectedGenre, setSelectedGenre, activePlaylistId, playPlaylist, tracks } = usePlayer()

	return (
		<div style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }} className="w-56 shrink-0 flex flex-col h-full overflow-y-auto">

			<NowPlayingCard />

			<div className="p-4">
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-widest font-semibold mb-3">Genre</p>
				{GENRES.map((genre) => {
					const active = genre === selectedGenre
					return (
						<button
							key={genre}
							onClick={() => setSelectedGenre(genre)}
							style={active ? { background: 'var(--accent-dim)', color: 'var(--accent-light)', fontWeight: 600 } : { color: 'var(--text-secondary)' }}
							className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer mb-1 hover:bg-[color:var(--bg-hover)]"
						>
							{genre}
						</button>
					)
				})}
			</div>

			<div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-widest font-semibold mb-3">Playlists</p>
				{PLAYLISTS.map((playlist) => {
					const active = playlist.id === activePlaylistId
					return (
						<div
							key={playlist.id}
							onClick={() => playPlaylist(playlist, TRACKS)}
							className={`cursor-pointer py-2 px-3 rounded-lg mb-1 transition-colors hover:bg-[color:var(--bg-hover)] ${active ? 'border-l-2 border-purple-500 pl-2 font-semibold' : ''}`}
						>
							<div className="text-sm">{playlist.name}</div>
							<div className="text-xs" style={{ color: 'var(--text-muted)' }}>{playlist.trackIds.length} tracks</div>
						</div>
					)
				})}
			</div>

		</div>
	)
}


import { usePlayer } from '../../context/PlayerContext'
import { PLAYLISTS, GENRES, TRACKS } from '../../data/tracks'
import NowPlayingCard from '../Player/NowPlayingCard'

export default function PlaylistSidebar() {
	const { selectedGenre, setSelectedGenre, activePlaylistId, playPlaylist, tracks } = usePlayer()

	return (
		<div className="w-60 shrink-0 flex flex-col h-full overflow-y-auto"
			style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>

			<NowPlayingCard />

			<div className="px-6 pt-6 pb-4">
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-[0.15em] font-bold mb-4 px-2">Genre</p>
				<div className="flex flex-col gap-1">
					{GENRES.map((genre) => {
						const active = genre === selectedGenre
						return (
							<button
								key={genre}
								onClick={() => setSelectedGenre(genre)}
								className={`sidebar-item ${active ? 'active' : ''} w-full text-left px-4 py-2.5 rounded-xl text-base font-medium cursor-pointer`}
								style={!active ? { color: 'var(--text-secondary)' } : undefined}
							>
								{genre}
							</button>
						)
					})}
				</div>
			</div>

			<div className="px-6 pt-4 pb-6 border-t" style={{ borderColor: 'var(--border)' }}>
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-[0.15em] font-bold mb-4 px-2">Playlists</p>
				<div className="flex flex-col gap-2">
					{PLAYLISTS.map((playlist) => {
						const active = playlist.id === activePlaylistId
						return (
							<div
								key={playlist.id}
								onClick={() => playPlaylist(playlist, TRACKS)}
								className={`sidebar-item ${active ? 'active' : ''} cursor-pointer py-3 px-4 rounded-xl`}
							>
								<div className="text-base font-bold" style={{ color: active ? 'var(--accent-light)' : 'var(--text-primary)' }}>
									{playlist.name}
								</div>
								<div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>
									{playlist.trackIds.length} tracks
								</div>
							</div>
						)
					})}
				</div>
			</div>

		</div>
	)
}

export default function Header() {
	return (
		<header style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
			className="px-6 py-4 flex items-center justify-between sticky top-0 z-50">

			<div className="flex items-center gap-3">
				<div style={{ background: 'var(--accent)' }} className="w-8 h-8 rounded-lg flex items-center justify-center">
					<span className="text-white font-bold text-lg">♪</span>
				</div>
				<h1 className="font-bold text-xl text-white">Melodic</h1>
			</div>

			<div className="flex items-center gap-2">
				<p className="text-sm" style={{ color: 'var(--text-secondary)' }}>16 tracks · 4 playlists</p>
			</div>

		</header>
	)
}


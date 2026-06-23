export default function Header() {
	return (
		<header className="glass px-8 py-5 flex items-center justify-between sticky top-0 z-50"
			style={{ borderBottom: '1px solid var(--border)' }}>

			<div className="flex items-center gap-3">
				<div className="w-9 h-9 rounded-xl flex items-center justify-center"
					style={{ background: 'var(--accent-gradient)', boxShadow: '0 2px 12px rgba(168, 85, 247, 0.3)' }}>
					<span className="text-white font-bold text-lg">♪</span>
				</div>
				<div>
					<h1 className="font-bold text-2xl gradient-text leading-tight">Melodic</h1>
					<p className="text-xs tracking-widest uppercase font-semibold" style={{ color: 'var(--text-muted)' }}>Music Player</p>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full"
					style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
					<span className="text-xs font-bold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
						16 tracks
					</span>
					<span style={{ color: 'var(--text-muted)' }} className="text-xs">·</span>
					<span className="text-xs font-bold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
						4 playlists
					</span>
				</div>
				<div className="w-8 h-8 rounded-full flex items-center justify-center"
					style={{ background: 'var(--accent-dim)', border: '1px solid var(--border)' }}>
					<span className="text-sm" style={{ color: 'var(--accent-light)' }}>♫</span>
				</div>
			</div>

		</header>
	)
}

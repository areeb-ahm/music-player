import Header from '../components/Header'
import PlaylistSidebar from '../components/Library/PlaylistSidebar'
import TrackList from '../components/Library/TrackList'
import SearchBar from '../components/Search/SearchBar'
import PlayerBar from '../components/Player/PlayerBar'
import { GENRES } from '../data/tracks'
import { usePlayer } from '../context/PlayerContext'

export default function HomePage() {
  const { selectedGenre, setSelectedGenre } = usePlayer()

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header />
      <div className="flex flex-1 overflow-hidden pb-24">
        <div className="hidden md:flex">
          <PlaylistSidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <SearchBar />
          </div>
          <div className="flex md:hidden gap-2 px-6 py-2 overflow-x-auto scrollbar-hide">
            {GENRES.map(genre => (
              <button key={genre} onClick={() => setSelectedGenre(genre)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
                style={{
                  background: selectedGenre === genre ? 'var(--accent)' : 'var(--bg-card)',
                  color: selectedGenre === genre ? 'white' : 'var(--text-secondary)',
                  border: '1px solid var(--border)'
                }}>
                {genre}
              </button>
            ))}
          </div>
          <TrackList />
        </div>
      </div>
      <PlayerBar />
    </div>
  )
}

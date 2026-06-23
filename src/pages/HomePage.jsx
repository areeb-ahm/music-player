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
        <div className="flex-1 flex flex-col overflow-hidden bg-[color:var(--bg-base)]">
          <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <SearchBar />
          </div>
          <div className="flex md:hidden gap-2 px-6 py-3 overflow-x-auto scrollbar-hide">
            {GENRES.map(genre => (
              <button key={genre} onClick={() => setSelectedGenre(genre)}
                className={`genre-pill ${selectedGenre === genre ? 'active' : ''} shrink-0 px-6 py-2.5 rounded-full text-sm font-bold`}>
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

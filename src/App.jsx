import { PlayerProvider } from './context/PlayerContext'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <PlayerProvider>
      <HomePage />
    </PlayerProvider>
  )
}

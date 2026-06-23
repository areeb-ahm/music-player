import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { TRACKS } from '../data/tracks'

export const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
	const [tracks] = useState(TRACKS)
	const [currentTrack, setCurrentTrack] = useState(TRACKS[0])
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(TRACKS[0]?.duration || 0)
	const [volume, setVolume] = useState(0.8)
	const [isMuted, setIsMuted] = useState(false)
	const [repeatMode, setRepeatMode] = useState('none')
	const [isShuffled, setIsShuffled] = useState(false)
	const [queue, setQueue] = useState(TRACKS)
	const [activePlaylistId, setActivePlaylistId] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedGenre, setSelectedGenre] = useState('All')

	const intervalRef = useRef(null)
	const audioRef = useRef(new Audio())

	const formatTime = useCallback((seconds) => {
		const m = Math.floor(seconds / 60)
		const s = Math.floor(seconds % 60)
		return m + ':' + (s < 10 ? '0' + s : s)
	}, [])

	const getShuffled = useCallback((arr) => {
		return [...arr].sort(() => Math.random() - 0.5)
	}, [])

	const play = useCallback((track) => {
		if (track) {
			setCurrentTrack(track)
			setCurrentTime(0)
			setDuration(track.duration)
			if (track.audioSrc) {
				audioRef.current.src = track.audioSrc
				audioRef.current.load()
				audioRef.current.volume = isMuted ? 0 : volume
				audioRef.current.play().catch(err => console.error(err))
			}
		} else {
			if (currentTrack?.audioSrc && audioRef.current.src) {
				audioRef.current.play().catch(err => console.error(err))
			}
		}
		setIsPlaying(true)
	}, [isMuted, volume, currentTrack])

	const pause = useCallback(() => {
		if (audioRef.current.src) {
			audioRef.current.pause()
		}
		setIsPlaying(false)
	}, [])

	const togglePlay = useCallback(() => {
		setIsPlaying((prev) => {
			if (prev) {
				if (audioRef.current.src) audioRef.current.pause()
				return false
			}
			play()
			return true
		})
	}, [play])

	const playNext = useCallback(() => {
		if (!queue || queue.length === 0) return
		if (repeatMode === 'one') {
			setCurrentTime(0)
			play()
			return
		}
		const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)
		const nextIndex = (currentIndex + 1) % queue.length
		const next = queue[nextIndex]
		if (next) play(next)
	}, [queue, currentTrack, repeatMode, play])

	const playPrev = useCallback(() => {
		if (currentTime > 3) {
			setCurrentTime(0)
			return
		}
		if (!queue || queue.length === 0) return
		const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)
		const prevIndex = (currentIndex - 1 + queue.length) % queue.length
		const prev = queue[prevIndex]
		if (prev) play(prev)
	}, [currentTime, queue, currentTrack, play])

	const seek = useCallback((time) => {
		const clamped = Math.min(Math.max(time, 0), duration)
		if (audioRef.current.src) {
			audioRef.current.currentTime = clamped
		}
		setCurrentTime(clamped)
	}, [duration])

	const setVolumeLevel = useCallback((val) => {
		const v = Math.min(Math.max(val, 0), 1)
		setVolume(v)
		if (v > 0) setIsMuted(false)
		audioRef.current.volume = isMuted ? 0 : v
	}, [isMuted])

	const toggleMute = useCallback(() => {
		setIsMuted((p) => {
			audioRef.current.volume = !p ? 0 : volume
			return !p
		})
	}, [volume])

	const toggleRepeat = useCallback(() => {
		setRepeatMode((prev) => {
			if (prev === 'none') return 'all'
			if (prev === 'all') return 'one'
			return 'none'
		})
	}, [])

	const toggleShuffle = useCallback(() => {
		setIsShuffled((prev) => {
			const next = !prev
			if (next) setQueue(getShuffled(tracks))
			else setQueue(tracks)
			return next
		})
	}, [tracks, getShuffled])

	const playPlaylist = useCallback((playlist, allTracks) => {
		const playlistTracks = playlist.trackIds.map((id) => allTracks.find((t) => t.id === id)).filter(Boolean)
		if (playlistTracks.length === 0) return
		setQueue(playlistTracks)
		setActivePlaylistId(playlist.id)
		play(playlistTracks[0])
	}, [play])

	useEffect(() => {
		const audio = audioRef.current
		const onTimeUpdate = () => setCurrentTime(audio.currentTime)
		const onEnded = () => playNext()
		const onLoadedMetadata = () => setDuration(audio.duration)
		audio.addEventListener('timeupdate', onTimeUpdate)
		audio.addEventListener('ended', onEnded)
		audio.addEventListener('loadedmetadata', onLoadedMetadata)
		return () => {
			audio.removeEventListener('timeupdate', onTimeUpdate)
			audio.removeEventListener('ended', onEnded)
			audio.removeEventListener('loadedmetadata', onLoadedMetadata)
		}
	}, [playNext])

	useEffect(() => {
		if (!currentTrack?.audioSrc) {
			if (isPlaying) {
				intervalRef.current = setInterval(() => {
					setCurrentTime((prev) => {
						if (prev >= duration - 1) {
							playNext()
							return 0
						}
						return prev + 1
					})
				}, 1000)
			} else {
				if (intervalRef.current) {
					clearInterval(intervalRef.current)
					intervalRef.current = null
				}
			}
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [isPlaying, duration, currentTrack, playNext])

	useEffect(() => {
		const handleKeyDown = (e) => {
			const tag = document.activeElement?.tagName?.toLowerCase()
			if (tag === 'input' || tag === 'textarea') return

			if (e.code === 'Space') {
				e.preventDefault() 
				togglePlay()
			} else if (e.code === 'ArrowRight') {
				playNext()
			} else if (e.code === 'ArrowLeft') {
				playPrev()
			} else if (e.code === 'KeyM') {
				toggleMute()
			} else if (e.code === 'KeyR') {
				toggleRepeat()
			} else if (e.code === 'KeyS') {
				toggleShuffle()
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [togglePlay, playNext, playPrev, toggleMute, toggleRepeat, toggleShuffle])

	const value = {
		tracks,
		currentTrack,
		isPlaying,
		currentTime,
		duration,
		volume,
		isMuted,
		repeatMode,
		isShuffled,
		queue,
		activePlaylistId,
		searchQuery,
		selectedGenre,
		intervalRef,
		formatTime,
		getShuffled,
		play,
		pause,
		togglePlay,
		playNext,
		playPrev,
		seek,
		setVolumeLevel,
		toggleMute,
		toggleRepeat,
		toggleShuffle,
		playPlaylist,
		setCurrentTrack,
		setCurrentTime,
		setDuration,
		setQueue,
		setActivePlaylistId,
		setSearchQuery,
		setSelectedGenre
	}

	return (
		<PlayerContext.Provider value={value}>
			{children}
		</PlayerContext.Provider>
	)
}

export const usePlayer = () => useContext(PlayerContext)


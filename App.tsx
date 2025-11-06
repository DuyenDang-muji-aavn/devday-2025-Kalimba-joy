import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KeyLayout, Theme, NoteInfo, Song } from './types';
import Kalimba from './components/Kalimba';
import Header from './components/Header';
import Controls from './components/Controls';
import LyricsDisplay from './components/LyricsDisplay';
import SettingsPanel from './components/SettingsPanel';
import SongLibrary from './components/SongLibrary';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useAudio } from './hooks/useAudio';
import { processVoiceCommand } from './services/geminiService';
import { SONGS } from './data/songs';
import { NOTE_FREQUENCIES } from './constants';

// Speech Recognition API setup
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
}

const App: React.FC = () => {
  const [keyLayout, setKeyLayout] = useState<KeyLayout>(17);
  const [theme, setTheme] = useState<Theme>('explorer');
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isSongLibraryOpen, setSongLibraryOpen] = useState(false);
  const [isThemeSwitcherOpen, setThemeSwitcherOpen] = useState(false);
  
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const [tempo, setTempo] = useState<number>(1);
  
  const [isListening, setListening] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>('');

  const { playNote } = useAudio();
  // Fix: Use ReturnType<typeof setTimeout> for browser compatibility instead of NodeJS.Timeout
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlayNote = useCallback((note: NoteInfo) => {
    playNote(note.frequency);
    setActiveNotes(prev => [...prev, note.note]);
    setTimeout(() => {
      setActiveNotes(prev => prev.filter(n => n !== note.note));
    }, 200);
  }, [playNote]);

  const stopPlayback = useCallback(() => {
    setPlaying(false);
    setCurrentNoteIndex(0);
    setActiveNotes([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const selectSong = (song: Song) => {
      stopPlayback();
      setCurrentSong(song);
      setSongLibraryOpen(false);
  };
  
  const playSongByName = useCallback((songId: string) => {
    const songToPlay = SONGS.find(s => s.id === songId);
    if (songToPlay) {
      selectSong(songToPlay);
      setTimeout(() => setPlaying(true), 100);
    }
  }, [stopPlayback]);


  // Song playback effect
  useEffect(() => {
    if (isPlaying && currentSong && currentNoteIndex < currentSong.notes.length) {
      const note = currentSong.notes[currentNoteIndex];
      const noteFrequency = NOTE_FREQUENCIES[note.note];
      
      if (noteFrequency) {
          handlePlayNote({ 
              note: note.note, 
              frequency: noteFrequency,
              // The rest of the NoteInfo properties are not essential for playback, just for the type
              label: note.note.slice(0, -1),
              octave: parseInt(note.note.slice(-1), 10),
              number: 0
          });
      }

      const duration = note.duration / tempo;
      timeoutRef.current = setTimeout(() => {
        setCurrentNoteIndex(prev => prev + 1);
      }, duration);
    } else if (isPlaying) {
      // Song finished
      stopPlayback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentSong, currentNoteIndex, tempo, handlePlayNote]);

  // Voice command processing
  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onresult = async (event: any) => {
      const command = event.results[0][0].transcript;
      setUserMessage(`You said: "${command}"`);
      const result = await processVoiceCommand(command);

      switch (result.action) {
        case 'play_song':
          playSongByName(result.payload as string);
          setUserMessage(`Playing ${SONGS.find(s=>s.id === result.payload)?.title}`);
          break;
        case 'change_keys':
          setKeyLayout(result.payload as KeyLayout);
          setUserMessage(`Switched to ${result.payload}-key layout.`);
          break;
        default:
          setUserMessage(`Sorry, I didn't understand that.`);
      }
      setTimeout(() => setUserMessage(''), 3000);
    };
  }, [playSongByName]);

  const handleMicClick = () => {
    if (!recognition) {
        alert("Sorry, your browser doesn't support voice commands.");
        return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const THEME_STYLES: Record<Theme, string> = {
    princess: 'bg-gradient-to-br from-[#F3A6FF] to-[#FFD6E0]',
    explorer: 'bg-gradient-to-br from-[#89E3FF] to-[#7CDFFF]',
    minimal: 'bg-gradient-to-br from-slate-700 to-slate-900',
    realistic: 'bg-[url(https://picsum.photos/seed/wood/1200/800)] bg-cover'
  };

  return (
    <main className={`w-screen h-screen overflow-hidden relative transition-all duration-500 ${THEME_STYLES[theme]}`}>
      <div className="absolute inset-0 bg-black/10"></div>
      
      <Header 
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenSongLibrary={() => setSongLibraryOpen(true)}
      />

      <div className="w-full h-full flex flex-col justify-center items-center pt-24 pb-40">
        <LyricsDisplay song={currentSong} currentNoteIndex={currentNoteIndex} />
        <Kalimba 
          keyLayout={keyLayout}
          activeNotes={activeNotes}
          onPlayNote={handlePlayNote}
          theme={theme}
        />
      </div>
      
      {userMessage && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg z-30">
          {userMessage}
        </div>
      )}

      <Controls 
        isPlaying={isPlaying}
        isListening={isListening}
        onPlayPause={() => { if(currentSong) setPlaying(!isPlaying) }}
        onStop={stopPlayback}
        onMic={handleMicClick}
        tempo={tempo}
        onTempoChange={(e) => setTempo(parseFloat(e.target.value))}
        onOpenThemeSwitcher={() => setThemeSwitcherOpen(true)}
      />

      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        keyLayout={keyLayout}
        onKeyLayoutChange={setKeyLayout}
      />
      
      <SongLibrary 
        isOpen={isSongLibraryOpen}
        onClose={() => setSongLibraryOpen(false)}
        onSelectSong={selectSong}
      />

      <ThemeSwitcher 
        isOpen={isThemeSwitcherOpen}
        onClose={() => setThemeSwitcherOpen(false)}
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </main>
  );
};

export default App;

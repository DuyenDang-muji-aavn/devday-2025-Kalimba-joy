
import React from 'react';
import { Song, SongNote } from '../types';

interface LyricsDisplayProps {
  song: Song | null;
  currentNoteIndex: number;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ song, currentNoteIndex }) => {
  if (!song) {
    return (
      <div className="h-24 flex items-center justify-center">
        <p className="text-white/80 text-lg italic">Select a song to begin</p>
      </div>
    );
  }

  // Find which line of lyrics the current note belongs to
  let lyricLineIndex = 0;
  let cumulativeLength = 0;
  for (let i = 0; i < song.lyrics.length; i++) {
    cumulativeLength += song.lyrics[i].split(/\s+/).length;
    if (currentNoteIndex < cumulativeLength) {
      lyricLineIndex = i;
      break;
    }
  }

  return (
    <div className="h-24 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-4 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-white transition-opacity duration-300">
            {song.lyrics[lyricLineIndex]}
        </p>
        <p className="text-lg sm:text-xl font-semibold text-white/60 transition-opacity duration-300 mt-2">
            {song.lyrics[lyricLineIndex + 1] || ''}
        </p>
    </div>
  );
};

export default LyricsDisplay;

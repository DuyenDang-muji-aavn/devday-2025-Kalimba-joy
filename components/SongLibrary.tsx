
import React from 'react';
import { Song } from '../types';
import { SONGS } from '../data/songs';
import { CloseIcon } from './icons';

interface SongLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSong: (song: Song) => void;
}

const SongItem: React.FC<{song: Song, onSelect: () => void}> = ({ song, onSelect }) => {
    const levelColor = 
        song.level === 'Beginner' ? 'bg-green-500/80' :
        song.level === 'Intermediate' ? 'bg-yellow-500/80' :
        'bg-red-500/80';
    
    const categoryEmoji = 
        song.category === 'Birthday' ? '🎂' :
        song.category === 'Christmas' ? '🎄' :
        '🌸';

    return (
        <button 
            onClick={onSelect}
            className="w-full flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all duration-300 text-left"
        >
            <div className="w-16 h-16 bg-black/20 rounded-xl flex items-center justify-center text-4xl">
                {categoryEmoji}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-lg text-white">{song.title}</h4>
                <p className="text-white/70">{song.category}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${levelColor}`}>
                {song.level}
            </span>
        </button>
    )
};

const SongLibrary: React.FC<SongLibraryProps> = ({ isOpen, onClose, onSelectSong }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={onClose}
    >
      <div 
        className="bg-white/20 backdrop-blur-2xl rounded-2xl p-8 text-white shadow-2xl w-full max-w-lg m-4 flex flex-col h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
            <h2 className="text-3xl font-bold">Song Library</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <CloseIcon />
            </button>
        </div>
        
        <div className="space-y-4 overflow-y-auto pr-2">
            {SONGS.map(song => (
                <SongItem key={song.id} song={song} onSelect={() => onSelectSong(song)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SongLibrary;

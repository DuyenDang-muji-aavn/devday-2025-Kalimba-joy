
import React from 'react';
import { SettingsIcon, MusicIcon } from './icons';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenSongLibrary: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenSongLibrary }) => {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center text-white">
      <button 
        onClick={onOpenSongLibrary}
        className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 shadow-lg"
        aria-label="Open Song Library"
      >
        <MusicIcon />
      </button>
      <h1 className="text-3xl font-extrabold text-shadow-lg">Kalimba Joy</h1>
      <button 
        onClick={onOpenSettings}
        className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 shadow-lg"
        aria-label="Open Settings"
      >
        <SettingsIcon />
      </button>
    </header>
  );
};

export default Header;

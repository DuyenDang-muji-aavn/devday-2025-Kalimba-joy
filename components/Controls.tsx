
import React from 'react';
import { PlayIcon, PauseIcon, StopIcon, MicIcon, PaletteIcon } from './icons';

interface ControlsProps {
  isPlaying: boolean;
  isListening: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onMic: () => void;
  tempo: number;
  onTempoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenThemeSwitcher: () => void;
}

const ControlButton: React.FC<{onClick: () => void; children: React.ReactNode, active?: boolean, ariaLabel: string}> = ({ onClick, children, active, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`
      w-16 h-16 rounded-full flex items-center justify-center 
      bg-white/20 backdrop-blur-md hover:bg-white/40
      transition-all duration-300 ease-in-out
      shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50
      ${active ? 'bg-white/40 scale-110' : ''}
    `}
  >
    {children}
  </button>
);


const Controls: React.FC<ControlsProps> = ({ 
  isPlaying, 
  isListening,
  onPlayPause, 
  onStop, 
  onMic,
  tempo,
  onTempoChange,
  onOpenThemeSwitcher
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col items-center gap-4 text-white">
       <div className="flex items-center gap-4">
          <ControlButton onClick={onPlayPause} ariaLabel={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </ControlButton>
          <ControlButton onClick={onStop} ariaLabel="Stop">
              <StopIcon />
          </ControlButton>
          <ControlButton onClick={onMic} active={isListening} ariaLabel="Use Voice Command">
            <div className={`relative ${isListening ? 'animate-pulse' : ''}`}>
              <MicIcon />
              {isListening && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white/50"></span>}
            </div>
          </ControlButton>
          <ControlButton onClick={onOpenThemeSwitcher} ariaLabel="Change Theme">
            <PaletteIcon />
          </ControlButton>
       </div>
       <div className="w-full max-w-xs flex items-center gap-3">
          <span className="text-sm font-bold">Tempo</span>
          <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={tempo}
              onChange={onTempoChange}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
          />
       </div>
    </div>
  );
};

export default Controls;

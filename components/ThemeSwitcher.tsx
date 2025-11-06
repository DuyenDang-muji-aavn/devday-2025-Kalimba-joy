
import React from 'react';
import { Theme } from '../types';
import { CloseIcon } from './icons';

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const THEMES: { id: Theme, name: string, gradient: string }[] = [
    { id: 'princess', name: 'Princess', gradient: 'from-[#F3A6FF] to-[#FFD6E0]' },
    { id: 'explorer', name: 'Explorer', gradient: 'from-[#89E3FF] to-[#7CDFFF]' },
    { id: 'minimal', name: 'Minimal', gradient: 'from-gray-500 to-gray-700' },
    { id: 'realistic', name: 'Realistic', gradient: 'from-[#A87C52] to-[#c9a37f]' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isOpen, onClose, currentTheme, onThemeChange }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={onClose}
    >
      <div 
        className="bg-white/20 backdrop-blur-2xl rounded-2xl p-8 text-white shadow-2xl w-full max-w-2xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Change Theme</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <CloseIcon />
            </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {THEMES.map(theme => (
                <button 
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={`
                        p-4 aspect-square rounded-2xl flex flex-col items-center justify-end
                        transition-all duration-300 ease-in-out
                        ${currentTheme === theme.id ? 'ring-4 ring-white shadow-2xl scale-105' : 'hover:scale-105'}
                    `}
                >
                    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${theme.gradient}`}></div>
                    <span className="mt-2 font-bold text-lg">{theme.name}</span>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;

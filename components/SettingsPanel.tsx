
import React from 'react';
import { KeyLayout } from '../types';
import { CloseIcon } from './icons';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  keyLayout: KeyLayout;
  onKeyLayoutChange: (layout: KeyLayout) => void;
}

const SettingsButton: React.FC<{onClick: () => void, isActive: boolean, children: React.ReactNode}> = ({onClick, isActive, children}) => (
    <button 
        onClick={onClick}
        className={`px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300 ${isActive ? 'bg-white text-blue-500 scale-105 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
    >
        {children}
    </button>
)

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, keyLayout, onKeyLayoutChange }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={onClose}
    >
      <div 
        className="bg-white/20 backdrop-blur-2xl rounded-2xl p-8 text-white shadow-2xl w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Settings</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <CloseIcon />
            </button>
        </div>
        
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold mb-3">Number of Keys</h3>
                <div className="flex justify-around items-center bg-black/20 p-2 rounded-2xl">
                    <SettingsButton onClick={() => onKeyLayoutChange(7)} isActive={keyLayout === 7}>7</SettingsButton>
                    <SettingsButton onClick={() => onKeyLayoutChange(11)} isActive={keyLayout === 11}>11</SettingsButton>
                    <SettingsButton onClick={() => onKeyLayoutChange(17)} isActive={keyLayout === 17}>17</SettingsButton>
                </div>
            </div>
            {/* Future settings like volume can be added here */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

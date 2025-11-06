
import React from 'react';
import { NoteInfo, KeyLayout, Theme } from '../types';
import { KEY_LAYOUTS } from '../constants';
import Tine from './Tine';

interface KalimbaProps {
  keyLayout: KeyLayout;
  activeNotes: string[];
  onPlayNote: (note: NoteInfo) => void;
  theme: Theme;
}

const Kalimba: React.FC<KalimbaProps> = ({ keyLayout, activeNotes, onPlayNote, theme }) => {
  const notes = KEY_LAYOUTS[keyLayout];
  const centerIndex = Math.floor(notes.length / 2);

  const bridgeColor = theme === 'realistic' ? 'bg-[#A87C52]' : 'bg-white/30';
  const woodColor = theme === 'realistic' ? 'bg-[#c9a37f]' : 'bg-transparent';

  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className={`relative ${woodColor} w-[300px] sm:w-[450px] md:w-[500px] h-[300px] sm:h-[320px] rounded-b-3xl`}>
        {/* Bridge */}
        <div className={`absolute top-[60px] left-1/2 -translate-x-1/2 w-[95%] h-4 ${bridgeColor} rounded-md shadow-inner`}></div>
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[98%] h-2 bg-slate-500 rounded-md shadow-md"></div>

        {/* Tines */}
        <div className="absolute top-[65px] left-0 w-full h-[200px] sm:h-[220px]">
          {notes.map((noteInfo, index) => {
            const offset = index - centerIndex;
            const absOffset = Math.abs(offset);
            
            const height = 180 - (absOffset * 15);
            const xPos = offset * 28;
            const rotation = offset * 1;

            const style: React.CSSProperties = {
              height: `${height}px`,
              left: `calc(50% + ${xPos}px)`,
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              transformOrigin: 'top center',
            };

            return (
              <Tine
                key={noteInfo.note}
                noteInfo={noteInfo}
                isActive={activeNotes.includes(noteInfo.note)}
                onPlay={onPlayNote}
                style={style}
                theme={theme}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Kalimba;

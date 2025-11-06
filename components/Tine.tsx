
import React from 'react';
import { NoteInfo } from '../types';

interface TineProps {
  noteInfo: NoteInfo;
  isActive: boolean;
  onPlay: (note: NoteInfo) => void;
  style: React.CSSProperties;
  theme: string;
}

const Tine: React.FC<TineProps> = ({ noteInfo, isActive, onPlay, style, theme }) => {
  const tineColor = theme === 'realistic' ? 'bg-slate-400' : 'bg-white/60';
  const activeGlow =
    theme === 'princess' ? 'shadow-[0_0_20px_4px_rgba(243,166,255,0.7)]' :
    theme === 'explorer' ? 'shadow-[0_0_20px_4px_rgba(137,227,255,0.7)]' :
    'shadow-[0_0_20px_4px_rgba(255,255,255,0.7)]';

  const textColor = theme === 'realistic' ? 'text-slate-700' : 'text-slate-800';

  return (
    <div
      className="absolute top-0 w-8 cursor-pointer group"
      style={style}
      onMouseDown={() => onPlay(noteInfo)}
      onTouchStart={(e) => { e.preventDefault(); onPlay(noteInfo); }}
    >
      <div
        className={`
          ${tineColor}
          mx-auto w-[12px] h-full rounded-b-md transition-all duration-150 ease-in-out
          ${isActive ? `${activeGlow} scale-105 brightness-150` : 'group-hover:brightness-110'}
        `}
      ></div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className={`font-bold text-sm ${textColor}`}>{noteInfo.label}{noteInfo.octave}</span>
        <span className={`text-xs font-semibold ${textColor}`}>{noteInfo.number}</span>
      </div>
    </div>
  );
};

export default Tine;

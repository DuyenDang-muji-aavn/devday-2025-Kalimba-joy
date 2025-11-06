
export interface NoteInfo {
  note: string;
  octave: number;
  label: string;
  number: number;
  frequency: number;
}

export interface SongNote {
  note: string;
  duration: number; // in milliseconds
  lyric: string;
}

export interface Song {
  id: string;
  title: string;
  category: 'Christmas' | 'Children' | 'Birthday';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  notes: SongNote[];
  lyrics: string[];
}

export type KeyLayout = 7 | 11 | 17;

export type Theme = 'princess' | 'explorer' | 'minimal' | 'realistic';

export interface VoiceCommand {
  action: 'play_song' | 'change_keys' | 'unrecognized';
  payload: string | number;
}

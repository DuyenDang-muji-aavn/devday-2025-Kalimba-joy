
import { NoteInfo, KeyLayout } from './types';

const NOTE_FREQUENCIES: { [key: string]: number } = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51
};

const C_MAJOR_SCALE: Omit<NoteInfo, 'frequency'>[] = [
  { note: 'C4', octave: 4, label: 'C', number: 1 },
  { note: 'D4', octave: 4, label: 'D', number: 2 },
  { note: 'E4', octave: 4, label: 'E', number: 3 },
  { note: 'F4', octave: 4, label: 'F', number: 4 },
  { note: 'G4', octave: 4, label: 'G', number: 5 },
  { note: 'A4', octave: 4, label: 'A', number: 6 },
  { note: 'B4', octave: 4, label: 'B', number: 7 },
  { note: 'C5', octave: 5, label: 'C', number: 1 },
  { note: 'D5', octave: 5, label: 'D', number: 2 },
  { note: 'E5', octave: 5, label: 'E', number: 3 },
  { note: 'F5', octave: 5, label: 'F', number: 4 },
  { note: 'G5', octave: 5, label: 'G', number: 5 },
  { note: 'A5', octave: 5, label: 'A', number: 6 },
  { note: 'B5', octave: 5, label: 'B', number: 7 },
  { note: 'C6', octave: 6, label: 'C', number: 1 },
  { note: 'D6', octave: 6, label: 'D', number: 2 },
  { note: 'E6', octave: 6, label: 'E', number: 3 },
];

const buildNoteInfo = (noteData: Omit<NoteInfo, 'frequency'>): NoteInfo => ({
  ...noteData,
  frequency: NOTE_FREQUENCIES[noteData.note],
});

// Kalimba tines are often arranged with the root note in the center, alternating left and right
const arrangeTines = (notes: NoteInfo[]): NoteInfo[] => {
    const arranged: NoteInfo[] = [];
    let left = true;
    notes.forEach(note => {
        if (left) {
            arranged.unshift(note);
        } else {
            arranged.push(note);
        }
        left = !left;
    });
    return arranged;
};

const KEY_LAYOUTS: Record<KeyLayout, NoteInfo[]> = {
  7: arrangeTines(C_MAJOR_SCALE.slice(0, 7).map(buildNoteInfo)),
  11: arrangeTines(C_MAJOR_SCALE.slice(0, 11).map(buildNoteInfo)),
  17: arrangeTines(C_MAJOR_SCALE.slice(0, 17).map(buildNoteInfo)),
};

export { NOTE_FREQUENCIES, KEY_LAYOUTS };

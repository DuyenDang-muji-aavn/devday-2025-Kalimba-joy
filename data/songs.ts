import { Song, SongNote } from '../types';

// C_MAJOR_SCALE Notes used in these songs:
// 1: C4, 2: D4, 3: E4, 4: F4, 5: G4, 6: A4, 7: B4, 8: C5
const note = (n: number) => ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'][n - 1];

const createNotes = (lyrics: string, numbers: number[], duration = 450): SongNote[] => {
    const words = lyrics.split(/\s+/);
    return numbers.map((n, i) => ({
        note: note(n),
        duration,
        lyric: words[i] || '',
    }));
};

export const SONGS: Song[] = [
    {
        id: 'twinkle-twinkle',
        title: 'Twinkle Twinkle Little Star',
        category: 'Children',
        level: 'Beginner',
        lyrics: [
            "Twinkle twinkle little star",
            "How I wonder what you are",
            "Up above the world so high",
            "Like a diamond in the sky",
            "Twinkle twinkle little star",
            "How I wonder what you are",
        ],
        notes: [
            ...createNotes("Twinkle twinkle little star", [1, 1, 5, 5, 6, 6, 5]),
            ...createNotes("How I wonder what you are", [4, 4, 3, 3, 2, 2, 1]),
            ...createNotes("Up above the world so high", [5, 5, 4, 4, 3, 3, 2]),
            ...createNotes("Like a diamond in the sky", [5, 5, 4, 4, 3, 3, 2]),
            ...createNotes("Twinkle twinkle little star", [1, 1, 5, 5, 6, 6, 5]),
            ...createNotes("How I wonder what you are", [4, 4, 3, 3, 2, 2, 1]),
        ]
    },
    {
        id: 'jingle-bells',
        title: 'Jingle Bells',
        category: 'Christmas',
        level: 'Intermediate',
        lyrics: [
            "Dashing through the snow",
            "In a one horse open sleigh",
            "O'er the fields we go",
            "Laughing all the way",
            "Oh, jingle bells, jingle bells",
            "Jingle all the way",
            "Oh what fun it is to ride",
            "In a one horse open sleigh",
        ],
        notes: [
            ...createNotes("Dashing through the snow", [3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 3]),
            ...createNotes("In a one horse open sleigh", [4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 3, 2, 5]),
            ...createNotes("O'er the fields we go", [3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 3]),
            ...createNotes("Laughing all the way", [4, 4, 4, 4, 4, 3, 3, 3, 5, 5, 4, 2, 1]),
            ...createNotes("Oh jingle bells jingle bells", [3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 3]),
            ...createNotes("Jingle all the way", [4, 4, 4, 4, 4, 3, 3, 3, 5, 5, 4, 2, 1]),
            ...createNotes("Oh what fun it is to ride", [5, 5, 5, 5, 5, 4, 4, 3, 2, 1]),
            ...createNotes("In a one horse open sleigh", [3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 3]),
        ]
    },
    {
        id: 'silent-night',
        title: 'Silent Night',
        category: 'Christmas',
        level: 'Beginner',
        lyrics: [
            "Silent night, holy night",
            "All is calm, all is bright",
            "Round yon virgin mother and child",
            "Holy infant so tender and mild",
            "Sleep in heavenly peace",
            "Sleep in heavenly peace",
        ],
        notes: [
            ...createNotes("Silent night holy night", [5, 6, 5, 3, 5, 6, 5, 3]),
            ...createNotes("All is calm all is bright", [6, 7, 6, 5, 3, 5, 4, 3]),
            ...createNotes("Round yon virgin mother and child", [4, 5, 6, 5, 4, 3, 2, 1]),
            ...createNotes("Holy infant so tender and mild", [3, 4, 5, 4, 3, 2, 1, 2]),
            ...createNotes("Sleep in heavenly peace", [3, 4, 5, 6, 5, 3, 2, 1]),
            ...createNotes("Sleep in heavenly peace", [3, 4, 5, 6, 5, 3, 2, 1]),
        ]
    },
    {
        id: 'mary-had-a-little-lamb',
        title: 'Mary Had a Little Lamb',
        category: 'Children',
        level: 'Beginner',
        lyrics: [
            "Mary had a little lamb",
            "Little lamb, little lamb",
            "Mary had a little lamb",
            "Its fleece was white as snow",
        ],
        notes: [
            ...createNotes("Mary had a little lamb", [3, 2, 1, 2, 3, 3, 3]),
            ...createNotes("Little lamb little lamb", [2, 2, 2, 3, 5, 5]),
            ...createNotes("Mary had a little lamb", [3, 2, 1, 2, 3, 3, 3]),
            ...createNotes("Its fleece was white as snow", [3, 2, 2, 3, 2, 1]),
        ]
    },
    {
        id: 'row-your-boat',
        title: 'Row, Row, Row Your Boat',
        category: 'Children',
        level: 'Beginner',
        lyrics: [
            "Row, row, row your boat",
            "Gently down the stream",
            "Merrily, merrily, merrily, merrily",
            "Life is but a dream",
        ],
        notes: [
            ...createNotes("Row row row your boat", [3, 3, 3, 4, 5]),
            ...createNotes("Gently down the stream", [5, 4, 5, 6, 7]),
            ...createNotes("Merrily merrily merrily merrily", [3, 3, 3, 6, 5, 4, 3, 2]),
            ...createNotes("Life is but a dream", [1, 5, 3, 1]),
        ]
    },
    {
        id: 'happy-birthday',
        title: 'Happy Birthday',
        category: 'Birthday',
        level: 'Beginner',
        lyrics: [
            "Happy birthday to you",
            "Happy birthday to you",
            "Happy birthday dear Friend",
            "Happy birthday to you",
        ],
        notes: [
            ...createNotes("Happy birthday to you", [1, 1, 2, 1, 4, 3]),
            ...createNotes("Happy birthday to you", [1, 1, 2, 1, 5, 4]),
            ...createNotes("Happy birthday dear Friend", [1, 1, 8, 6, 4, 3, 2]),
            ...createNotes("Happy birthday to you", [7, 7, 6, 4, 5, 4]),
        ]
    }
];

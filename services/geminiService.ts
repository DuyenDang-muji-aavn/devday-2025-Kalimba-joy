
import { GoogleGenAI, Type } from "@google/genai";
import { VoiceCommand } from '../types';
import { SONGS } from '../data/songs';

const songTitles = SONGS.map(song => song.title);

const processVoiceCommand = async (command: string): Promise<VoiceCommand> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return { action: 'unrecognized', payload: 'API key not configured.' };
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Parse the following user command: "${command}". Determine the user's intent and extract the relevant payload. The possible actions are 'play_song' and 'change_keys'. For 'play_song', the payload should be one of the following song titles: ${songTitles.join(', ')}. For 'change_keys', the payload should be one of the following numbers: 7, 11, 17. If the intent is unclear or doesn't match, the action should be 'unrecognized'.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: {
              type: Type.STRING,
              description: "The user's intent. Must be 'play_song', 'change_keys', or 'unrecognized'."
            },
            payload: {
              type: Type.STRING,
              description: "The extracted song title or number of keys. For 'play_song', it should be a song title. For 'change_keys', it should be a number (as a string). For 'unrecognized', it can be an empty string."
            }
          }
        }
      }
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);

    // Validate and format the result
    if (result.action === 'change_keys') {
        const keyNum = parseInt(result.payload, 10);
        if ([7, 11, 17].includes(keyNum)) {
            return { action: 'change_keys', payload: keyNum };
        }
    } else if (result.action === 'play_song') {
        // Find the closest matching song title to handle minor recognition errors
        const lowerCasePayload = result.payload.toLowerCase();
        const foundSong = SONGS.find(song => song.title.toLowerCase().includes(lowerCasePayload));
        if (foundSong) {
             return { action: 'play_song', payload: foundSong.id };
        }
    }

    return { action: 'unrecognized', payload: 'Command not understood.' };

  } catch (error) {
    console.error('Error processing voice command with Gemini:', error);
    return { action: 'unrecognized', payload: 'Could not process command.' };
  }
};

export { processVoiceCommand };

import { apiClient } from '../api/client';
import type { Note, NoteCreate } from '../types/note.types';

export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    const response = await apiClient.get<Note[]>('/notes');
    return response.data;
  },
  
  createNote: async (note: NoteCreate): Promise<Note> => {
    const response = await apiClient.post<Note>('/notes', note);
    return response.data;
  },
  
  updateNote: async (id: string, note: Partial<NoteCreate>): Promise<Note> => {
    const response = await apiClient.put<Note>(`/notes/${id}`, note);
    return response.data;
  },
  
  deleteNote: async (id: string): Promise<void> => {
    await apiClient.delete(`/notes/${id}`);
  }
};

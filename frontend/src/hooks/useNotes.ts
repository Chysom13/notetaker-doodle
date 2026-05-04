import { useState, useEffect, useCallback } from 'react';
import type { Note, NoteCreate } from '../types/note.types';
import { noteService } from '../services/noteService';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await noteService.getNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createNote = async (note: NoteCreate) => {
    try {
      await noteService.createNote(note);
      await fetchNotes();
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const updateNote = async (id: string, note: Partial<NoteCreate>) => {
    try {
      await noteService.updateNote(id, note);
      await fetchNotes();
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await noteService.deleteNote(id);
      await fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    isLoading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes: fetchNotes
  };
};

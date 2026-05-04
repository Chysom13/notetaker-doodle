import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { NoteCreate } from '../../types/note.types';

interface NoteFormProps {
  onSubmit: (note: NoteCreate) => void;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Start writing..."
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        <Plus size={20} />
        Add Note
      </button>
    </form>
  );
};

import { useState } from 'react';
import { Edit3, Trash2, Save, X } from 'lucide-react';
import type { Note, NoteCreate } from '../../types/note.types';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, note: Partial<NoteCreate>) => void;
  onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onUpdate, onDelete }: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleUpdate = () => {
    onUpdate(note.id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  if (isEditing) {
    return (
      <div className="note-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--primary)', borderRadius: '8px', padding: '0.5rem', color: 'white' }}
          />
          <textarea
            className="edit-textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--primary)', borderRadius: '8px', padding: '0.5rem', color: 'white' }}
            rows={4}
          />
          <div className="note-actions">
            <button className="action-btn" onClick={handleUpdate}>
              <Save size={18} />
            </button>
            <button className="action-btn" onClick={cancelEditing}>
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>{note.title}</h3>
      </div>
      <p>{note.content}</p>
      <div className="note-footer">
        <span>{new Date(note.created_at).toLocaleDateString()}</span>
        <div className="note-actions">
          <button className="action-btn" onClick={() => setIsEditing(true)}>
            <Edit3 size={18} />
          </button>
          <button className="action-btn delete" onClick={() => onDelete(note.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

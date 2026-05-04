import { NoteCard } from '../components/NoteCard/NoteCard';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useNotes } from '../hooks/useNotes';

export const ViewNotesPage = () => {
  const { notes, updateNote, deleteNote, isLoading } = useNotes();

  return (
    <div className="page-content animation-fade-in">
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Your Notes</h2>
        <p style={{ color: 'var(--text-muted)' }}>Browse and manage your saved thoughts</p>
      </header>

      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading notes...</div>
      ) : (
        <>
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onUpdate={updateNote} 
                onDelete={deleteNote} 
              />
            ))}
          </div>
          
          {notes.length === 0 && <EmptyState />}
        </>
      )}
    </div>
  );
};

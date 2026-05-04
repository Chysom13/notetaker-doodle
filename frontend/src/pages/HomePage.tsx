import { Header } from '../components/Header/Header';
import { NoteForm } from '../components/NoteForm/NoteForm';
import { useNotes } from '../hooks/useNotes';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { createNote } = useNotes();
  const navigate = useNavigate();

  const handleCreate = async (note: any) => {
    await createNote(note);
    navigate('/notes');
  };

  return (
    <div className="page-content animation-fade-in">
      <Header />
      <NoteForm onSubmit={handleCreate} />
    </div>
  );
};

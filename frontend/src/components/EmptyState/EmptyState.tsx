import { BookOpen } from 'lucide-react';

export const EmptyState = () => (
  <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
    <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
    <p>No notes yet. Start creating!</p>
  </div>
);

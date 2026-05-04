export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

export interface NoteCreate {
  title: string;
  content: string;
}

from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import note as crud_note
from app.schemas import note as schemas_note

router = APIRouter()

@router.get("/", response_model=List[schemas_note.Note])
def read_notes(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    return crud_note.get_notes(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas_note.Note)
def create_note(note: schemas_note.NoteCreate, db: Session = Depends(deps.get_db)):
    return crud_note.create_note(db=db, note=note)

@router.put("/{note_id}", response_model=schemas_note.Note)
def update_note(note_id: str, note: schemas_note.NoteUpdate, db: Session = Depends(deps.get_db)):
    db_note = crud_note.update_note(db, note_id=note_id, note=note)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note

@router.delete("/{note_id}")
def delete_note(note_id: str, db: Session = Depends(deps.get_db)):
    success = crud_note.delete_note(db, note_id=note_id)
    if not success:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted successfully"}

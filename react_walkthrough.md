# React Frontend Architecture Documentation

The frontend has been completely overhauled from a monolithic `App.tsx` into a robust, scalable React architecture. We've introduced proper separations of concerns by isolating state management, API interaction, TypeScript types, and UI presentation logic.

Below is a detailed breakdown of each component in the newly built `frontend/src/` directory.

---

## 1. Types Layer (`src/types/`)
**`src/types/note.types.ts`**
- **Purpose**: A centralized location for all TypeScript interfaces.
- **Functionality**:
  - Exporting `Note` and `NoteCreate` ensures that any component, hook, or service interacting with a Note has absolute type safety without creating circular dependencies between files.

---

## 2. API Layer (`src/api/` & `src/services/`)
**`src/api/client.ts`**
- **Purpose**: The base HTTP client configuration.
- **Functionality**:
  - Sets up the core `axios.create()` instance pointing to your backend (`http://localhost:8001`). This makes adding global interceptors (like Authentication tokens) incredibly easy in the future.

**`src/services/noteService.ts`**
- **Purpose**: Encapsulates all note-related API calls.
- **Functionality**:
  - Imports the configured `apiClient` and provides `getNotes`, `createNote`, `updateNote`, and `deleteNote` functions that return strongly-typed `Promise` responses.

---

## 3. State Management Layer (`src/hooks/`)
**`src/hooks/useNotes.ts`**
- **Purpose**: A custom React Hook for managing the application's global note state.
- **Functionality**:
  - Contains all the `useState` and `useEffect` logic that was previously clogging up the UI layout. 
  - Exposes the `notes` array, `isLoading`, and `error` states, along with functions to mutate the data (`createNote`, `updateNote`, etc.). 
  - Using this hook allows any UI component to tap directly into the Notes data logic effortlessly.

---

## 4. UI Components Layer (`src/components/`)
**`src/components/Navigation/Navigation.tsx`**
- **Purpose**: The top navigation bar allowing users to switch between pages without reloading the application.

**`src/components/Header/Header.tsx`**
- **Purpose**: The static branding at the top of the application.

**`src/components/NoteForm/NoteForm.tsx`**
- **Purpose**: The form used to create new notes.
- **Functionality**:
  - Manages its own localized state (`title`, `content`) for typing, and calls `onSubmit` only when the form is fully valid, keeping the global state clean.

**`src/components/NoteCard/NoteCard.tsx`**
- **Purpose**: Displays a single Note and manages its edit mode.
- **Functionality**:
  - Holds localized `isEditing` state. This prevents the *entire list of notes* from re-rendering just because the user starts typing inside a single note's edit field. Highly optimized!

**`src/components/EmptyState/EmptyState.tsx`**
- **Purpose**: The "No notes yet" display logic decoupled from the main grid.

---

## 5. Pages Layer (`src/pages/`)
**`src/pages/HomePage.tsx`**
- **Purpose**: The primary landing route (`/`).
- **Functionality**:
  - Displays the `Header` and the `NoteForm`. When a note is created here, it automatically routes the user to the View Notes page to see their new entry.

**`src/pages/ViewNotesPage.tsx`**
- **Purpose**: The gallery route (`/notes`).
- **Functionality**:
  - Dedicated entirely to fetching and displaying the grid of notes using `NoteCard` components and handling the `EmptyState`.

---

## 6. Main Presentation Layer
**`src/App.tsx`**
- **Purpose**: The high-level routing orchestrator.
- **Functionality**:
  - Wraps the application in `react-router-dom`'s `<BrowserRouter>`, sets up the global `<Navigation />` bar, and defines the `<Routes>` mapping URLs to their respective Page components.

**`src/main.tsx`**
- **Purpose**: The standard Vite entry point injecting the App into the HTML DOM.

---

## 7. Styles Layer (`src/styles/`)
**`src/styles/global.css`**
- **Purpose**: Centralized application styling.
- **Functionality**:
  - Replaces `index.css` and the unused `App.css`. It maintains the premium, glassmorphic aesthetic defined previously while living in a proper `styles/` namespace.

> [!TIP]
> The frontend is now verified. Run `npm run dev` to start your application and experience the seamless, refactored codebase!

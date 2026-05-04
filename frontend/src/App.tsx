import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './pages/HomePage';
import { ViewNotesPage } from './pages/ViewNotesPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<ViewNotesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

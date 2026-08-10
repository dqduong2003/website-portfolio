import { createRoot } from 'react-dom/client';
import './globals.css';
import ProjectsShowcase from './components/ProjectsShowcase.jsx';

const root = document.getElementById('proj-grid-root');
if (root) {
  createRoot(root).render(<ProjectsShowcase />);
}

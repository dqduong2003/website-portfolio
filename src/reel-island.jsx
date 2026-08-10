import { createRoot } from 'react-dom/client';
import './globals.css';
import ReelCarousel from './components/ReelCarousel.jsx';

const root = document.getElementById('vid-reel-carousel-root');
if (root) {
  createRoot(root).render(<ReelCarousel />);
}

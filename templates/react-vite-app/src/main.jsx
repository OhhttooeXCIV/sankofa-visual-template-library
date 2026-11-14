import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return <main><p className="eyebrow">Sankofa starter</p><h1>__PROJECT_NAME__</h1><p>Your lightweight React/Vite foundation is ready.</p></main>;
}
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);

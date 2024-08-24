import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoBackground from './components/VideoBackground';
import PdfBook from './components/PdfBook';

function App() {
  return (
    <Router>
     
      <div className='app'>
      <VideoBackground />
        <Routes>
          <Route path="/pdf" element={<PdfBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

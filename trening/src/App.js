import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import WorkoutProgram from './WorkoutProgram.js';
import Routine from './Routine';

function App() {
  return (
    <BrowserRouter>
      <div className="body">
 
        <NavBar />
        <Routes>
          <Route path="/" element={<WorkoutProgram />} />

          <Route path="/WorkoutProgram" element={<WorkoutProgram />} />

          <Route path="/Routine" element={<Routine />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

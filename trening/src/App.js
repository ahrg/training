import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import NavBar from './NavBar';
import WorkoutProgram from './WorkoutProgram.js';
import Routine from './Routine';

function App() {
  return (
    <HashRouter>
      <div className="body">
        <NavBar/>
        <Routes>
          <Route path="/" element={<WorkoutProgram />} />
          <Route path="/WorkoutProgram" element={<WorkoutProgram />} />
          <Route path="/Routine" element={<Routine />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
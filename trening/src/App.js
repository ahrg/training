import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import WorkoutProgram from './WorkoutProgram.js'; // Import WorkoutProgram
import Routine from './Routine';

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        {/* Include NavBar here */}
        <NavBar />

        {/* Define routes */}
        <Routes>
          {/* Set WorkoutProgram as the default route */}
          <Route path="/" element={<WorkoutProgram />} /> {/* Main Page */}
          {/* Route for WorkoutProgram */}
          <Route path="/WorkoutProgram" element={<WorkoutProgram />} />

          <Route path="/Routine" element={<Routine />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='NavBar color'>
            <Link to="./WorkoutProgram" className="NavButton">Workout Program</Link>
            <Link to="./Rotuine" className="NavButton">Routine</Link>
        </div>
    );
};

export default NavBar;

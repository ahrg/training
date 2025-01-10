import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navBar'>
        <div className='stocks'>
            <Link to="./WorkoutProgram">Workout Program</Link>
            <Link to="./Rotuine">Routine</Link>
        </div>
        </div>
    );
};

export default NavBar;

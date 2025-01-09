import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navBar'>
        <div className='stocks'>
            <Link to="./WorkoutProgram">Workout Program</Link>
        </div>
        </div>
    );
};

export default NavBar;

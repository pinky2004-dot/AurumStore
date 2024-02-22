import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            AurumStore
        </div>
        <ul className='navbar-menu'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/admin'>Admin</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </ul>
    </div>
  )
}

export default Navbar;
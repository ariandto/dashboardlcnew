import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; // Import Materialize JavaScript
import './sidebar.css'; // Import file CSS untuk gaya tambahan

const Sidebar = () => {
    useEffect(() => {
        let sidenav = document.querySelector('#mobile-nav');
        M.Sidenav.init(sidenav, {});
    }, []);

    return (
        <ul className="sidenav sidenav-fixed" id="mobile-nav">
            <li>
                <a href="#!">Dashboard LC</a>
            </li>
            <li>
                <a href="#!">Dashboard In Out</a>
            </li>
        </ul>
    );
};

export default Sidebar;

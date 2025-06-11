import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export function Root() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Inicio</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { Root as Component };
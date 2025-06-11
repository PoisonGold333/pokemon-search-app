import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <div className="App">
      <div className="error-page" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>¡Oops!</h1>
        <p>Lo siento, ha ocurrido un error inesperado.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
        <Link to="/" className="back-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
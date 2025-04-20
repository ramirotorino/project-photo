import "./Header.css";

function Header({ onLoginClick, onRegisterClick, currentUser, onLogout }) {
  return (
    <header className="header">
      <div className="page header__inner">
        <a href="/" className="header__logo">
          📷 The Manco Fotógrafo
        </a>
        <nav className="header__nav">
          <a href="/galeria" className="header__link">
            Galería
          </a>
        </nav>
        {currentUser ? (
          <div className="header__user-info">
            <p className="header__user-email">👤 {currentUser.email}</p>
            <button className="header__logout-button" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <button onClick={onLoginClick}>Iniciar sesión</button>
            <button onClick={onRegisterClick}>Registrarse</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

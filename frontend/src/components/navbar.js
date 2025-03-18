import { useLocation, useNavigate, Link } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Voice App</div>
        <ul className="navbar-links">
          <li>
            <Link to="/">
              <a className={location.pathname === '/' ? 'active' : ''}>Home Page</a>
            </Link>
          </li>
          <li>
            <Link to="/tts">
              <a className={location.pathname === '/tts' ? 'active' : ''}>Text To Speech</a>
            </Link>
          </li>
          <li>
            <Link to="/asr">
              <a className={location.pathname === '/asr' ? 'active' : ''}>Speech Recognition</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
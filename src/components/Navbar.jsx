import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/Theme.context';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useAuth } from '../contexts/Auth.context';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthed } = useAuth(); //useAuth hook gebruiken om te kijken via isAuthed of we aangemeld zijn

  return (
    <nav className={`navbar sticky-top bg-${theme} text-bg-${theme} mb-4`}>
      <div className="container-fluid flex-column flex-sm-row align-items-start align-items-sm-center">
        <div className="nav-item my-2 mx-sm-3 my-sm-0">
          <Link className="nav-link" to="/">Transactions</Link>
        </div>
        <div className="nav-item my-2 mx-sm-3 my-sm-0">
          <Link className="nav-link" to="/places">Places</Link>
        </div>
        <div className="flex-grow-1"></div>
        
        {/* checken of we aangemeld zijn om de Login of Logout knop te tonen */}
        {
          isAuthed ? (
            <div className="nav-item my-2 mx-sm-3 my-sm-0">
              <Link className="nav-link" to="/logout">Logout</Link>
            </div>
          ) : (
            <div className="nav-item my-2 mx-sm-3 my-sm-0">
              <Link className="nav-link" to="/login">Login</Link>
            </div>
          )
        }

        <button className="btn btn-secondary" type="button" onClick={toggleTheme}>
          {
            theme === 'dark'
              ? <IoMoonSharp />
              : <IoSunny />
          }
        </button>
      </div>
    </nav>
  );
}

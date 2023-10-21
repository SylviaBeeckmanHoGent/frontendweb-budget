import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import TransactionList from './components/transactions/TransactionList';
import PlacesList from './components/places/PlacesList';
import { themes, useTheme } from './contexts/Theme.context';

function App() {
  const {theme, oppositeTheme, toggleTheme} = useTheme();

  return (
    <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
      <button type='button' onClick={toggleTheme}>
        {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
      </button>
      <TransactionList />
      <PlacesList />
    </div>
  );
}
export default App;

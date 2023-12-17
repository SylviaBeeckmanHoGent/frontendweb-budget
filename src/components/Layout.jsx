//dit is de Root component
import { Outlet } from 'react-router-dom';
import { useThemeColors } from '../contexts/Theme.context';
import Navbar from './Navbar';

export default function Layout() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
		<div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
      <Navbar />
      <Outlet />
    </div>
  );
}

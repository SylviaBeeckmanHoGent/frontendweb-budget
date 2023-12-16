// Importeer React-hooks en -componenten
import { useCallback } from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { useThemeColors } from '../../contexts/Theme.context';

// Functionele React-component Star
const Star = ({ index, selected = false, onSelect = (f) => f }) => {
  // Gebruik useCallback om ervoor te zorgen dat de handleClick-functie niet opnieuw wordt gemaakt bij elke render
  const handleClick = useCallback(
    () => {
      onSelect(index + 1); // Roep de onSelect-functie aan met het huidige sterrenindex + 1
    },
    [index, onSelect],
  );

  // Render een stericoon met kleur op basis van geselecteerd zijn, voeg een click-handler toe
  return (
    <IoStarSharp color={selected ? 'yellow' : 'grey'} onClick={handleClick} />
  );
};

// Hoofdcomponent StarRating
export default function StarRating({
  totalStars = 5, // Het totale aantal sterren dat weergegeven moet worden
  selectedStars = 0, // Het aantal geselecteerde sterren
  onRate, // Een functie om de beoordeling bij te werken wanneer een ster wordt geselecteerd
}) {
  // Haal het tegenovergestelde thema op uit de Theme-context met behulp van de useThemeColors-hook
  const { oppositeTheme } = useThemeColors();

  // Render een reeks sterren met behulp van de Star-component, waarbij geselecteerde sterren worden bepaald door de gegeven 'selectedStars'
  return (
    <>
      {[...new Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          index={i}
          selected={selectedStars > i}
          onSelect={onRate}
        />
      ))}
      {/* Toon het aantal geselecteerde sterren en het totale aantal sterren in tekstvorm */}
      <p className={`text-${oppositeTheme}`}>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}


// De StarRating-component bevat een reeks sterren die kunnen worden geselecteerd door erop te klikken. 
// Elke ster wordt vertegenwoordigd door de Star-component. Het aantal geselecteerde sterren wordt weergegeven, 
// samen met het totale aantal sterren in tekstvorm. De kleur van de sterren wordt bepaald door het thema van de applicatie, 
// en de onRate-functie wordt aangeroepen wanneer een ster wordt geselecteerd om de beoordeling bij te werken.
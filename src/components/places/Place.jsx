// Importeer React-hooks en -componenten
import { memo, useCallback } from 'react';
import { useThemeColors } from '../../contexts/Theme.context'; // Importeer de useThemeColors-hook vanuit de Theme-context
import StarRating from './StarRating'; // Importeer de StarRating-component vanuit hetzelfde bestand

// Functionele React-component PlaceMemoized met memoïzatie voor prestatieoptimalisatie
const PlaceMemoized = memo(function Place({ id, name, rating, onRate, onDelete }) {
  // Haal themakleuren op uit de Theme-context met behulp van de useThemeColors-hook
  const { theme, oppositeTheme } = useThemeColors();

  // Functie om de beoordeling van de plaats bij te werken wanneer een nieuwe beoordeling is geselecteerd
  const handleRate = (newRating) => {
    onRate(id, newRating);
  };

  // Gebruik de useCallback-hook om ervoor te zorgen dat de handleDelete-functie niet opnieuw wordt gemaakt bij elke render
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  // Render een kaart met plaatsgegevens, inclusief naam, beoordeling en actieknop voor verwijderen
  return (
    <div className={`card bg-${theme} border-${oppositeTheme} mb-4`}>
      <div className='card-body'>
        <h5 className={`card-title text-${oppositeTheme}`}>{name}</h5>
        {/* Gebruik de StarRating-component om de beoordeling weer te geven */}
        <StarRating selectedStars={rating} onRate={handleRate} />
        {/* Knop voor het verwijderen van de plaats met de handleDelete-functie */}
        <button className='btn btn-primary' onClick={handleDelete}>
          Verwijder
        </button>
      </div>
    </div>
  );
});

// Exporteer de gememoïseerde (geoptimaliseerde) versie van de Place-component
export default PlaceMemoized;

// De PlaceMemoized-component vertegenwoordigt een kaart voor een plaats met specifieke kenmerken, zoals naam en beoordeling. 
// De beoordeling wordt weergegeven met behulp van de StarRating-component. 
// De kleuren van de kaart worden bepaald door het huidige thema in de applicatie, dat wordt opgehaald via de useThemeColors-hook. 
// De component is gememoïseerd met memo om re-renders te voorkomen wanneer de props niet zijn gewijzigd, wat de prestaties kan optimaliseren.
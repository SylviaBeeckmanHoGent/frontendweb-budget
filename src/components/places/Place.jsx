import { memo } from 'react';
import StarRating from './StarRating';
import { useThemeColors } from '../../contexts/Theme.context';

const Place = memo(({ id, name, rating, onRate, onDelete }) => {
  const { theme, oppositeTheme } = useThemeColors();

  const handleRate = (newRating) => {
    onRate(id, newRating);
  };

  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className={`card bg-${theme} text-${oppositeTheme} border-${oppositeTheme} mb-4`}>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <StarRating selectedStars={rating} onRate={handleRate} />
        <button className='btn btn-primary' onClick={handleDelete}>
          Verwijder
        </button>
      </div>
    </div>
  );
});

export default Place;

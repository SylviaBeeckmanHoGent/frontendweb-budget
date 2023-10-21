import { memo } from 'react';
import StarRating from './StarRating';

const Place = memo(({ id, name, rating, onRate, onDelete }) => {
  const handleRate = (newRating) => {
    onRate(id, newRating);
  };

  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className='card bg-light border-dark mb-4'>
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

import StarRating from "./StarRating";

// src/components/places/Place.jsx
const Place = ({ id, name, rating, onRate, onDelete }) => { //place krijgt nu ook een property onRate mee
  const handleRate = (rating) => {
    onRate(id, rating);
  };

  const handleDelete = () => {
    onDelete(id);
  };
  
  return (
    <div className='card bg-light border-dark mb-4'>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        {/* <StarRating numberOfTotalStars={3}/> */} {/* we kunnen het aantal sterren ook hier instellen */}
        {/* <StarRating /> deze StarRating component zal default 5 sterren tonen */}
        <StarRating selectedStars={rating} onRate={handleRate} />

        <button className='btn btn-primary mt-3' onClick={handleDelete}>
          Verwijder
        </button>
      </div>
    </div>
  );
};

export default Place;

import Place from './Place';

const PlacesCards = ({
  places,
  onRate,
  onDelete
}) => {
  return (
    <div className='grid mt-3'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3'>
        {places
          .sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          )
          .map((p) => (
            <div className='col' key={p.id}>
              <Place
                {...p}
                onRate={onRate}
                onDelete={onDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesCards;

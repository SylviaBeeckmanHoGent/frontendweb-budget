// src/components/places/PlacesList.jsx
import { useState } from 'react';
import { PLACE_DATA } from '../../api/mock_data';
import Place from './Place';


const PlacesList = () => {
  const [places, setPlaces] = useState(PLACE_DATA);

  const handleRatePlace = (id, rating) => {
    //je kan onderstaande ook herschrijven zoals bij handleDeletePlace (met een filter functie)
    const newPlaces = places.map((p) =>
      p.id === id ? { ...p, rating } : p 
      //als de id van de huidige place = id die we meekregen, dan voegen we de place met de nieuwe rating toe, anders behouden we de huidige place
    );
    setPlaces(newPlaces); 
    //we krijgen dus een nieuwe lijst van places en zetten deze in onze state variabele -> het is deze set die een nieuwe render zal triggeren
  };

  const handleDeletePlace = (id) => {
    setPlaces((places) => places.filter((p) => p.id !== id)); //we houden alleen de plaatsen over waarvan de id niet gelijk is aan de id die we meekregen
    // de return waarde van deze functie wordt dan de nieuwe state
  };

  return (
    <div className='grid mt-3'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3'>
        {places
          .sort((a, b) => // sorteer de plaatsen alfabetisch op naam
            a.name.toUpperCase().localeCompare(b.name.toUpperCase()) // localeCompare() is een methode van de String klasse = vergelijkt twee strings alfabetisch
          )
          .map((p) => (
            <div className='col' key={p.id}>
              <Place {...p} onRate={handleRatePlace} onDelete={handleDeletePlace}/> 
            </div>
            // place krijgt nu een nieuwe property onRate, die verwijst naar de functie handleRatePlace
          ))}
      </div>
    </div>
  );
};

export default PlacesList;

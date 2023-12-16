// Importeer React-hooks en -componenten
import useSWR from 'swr';
import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import PlacesCards from '../../components/places/PlacesCards'; // Importeer de PlacesCards-component
import { getAll, save, deleteById } from '../../api'; // Importeer API-functies voor het ophalen, opslaan en verwijderen van plaatsen
import AsyncData from '../../components/AsyncData'; // Importeer de AsyncData-component voor het omgaan met asynchrone gegevens

// Hoofdcomponent PlacesList
export default function PlacesList() {
  // Haal plaatsgegevens op met behulp van de useSWR-hook
  const { data: places, error, isLoading } = useSWR('places', getAll);
  
  // Gebruik de useSWRMutation-hook om de save-functie te muteren
  const { trigger: savePlace, error: saveError } = useSWRMutation('places', save);
  
  // Gebruik de useSWRMutation-hook om de deleteById-functie te muteren
  const { trigger: deletePlace, error: deleteError } = useSWRMutation('places', deleteById);

  // Callbackfunctie om de beoordeling van een plaats bij te werken
  const handleRatePlace = useCallback(async (id, rating) => {
    // Zoek de plaats met de gegeven id
    const place = places.find((p) => p.id === id);
    
    // Roep de savePlace-functie aan om de plaats met de bijgewerkte beoordeling op te slaan
    await savePlace({ ...place, rating });
  }, [savePlace, places]);

  // Render de component
  return (
    <>
      <h1>Places</h1>

      {/* Render de AsyncData-component voor het omgaan met asynchrone gegevens */}
      <AsyncData loading={isLoading} error={error || saveError || deleteError}>
        {/* Render de PlacesCards-component met de opgehaalde plaatsgegevens en callbackfuncties */}
        <PlacesCards places={places} onRate={handleRatePlace} onDelete={deletePlace} />
      </AsyncData>
    </>
  );
}



// De PlacesList-component maakt gebruik van verschillende hooks uit de SWR-bibliotheek om plaatsgegevens op te halen, op te slaan en te verwijderen. 
// Het maakt ook gebruik van de PlacesCards-component om de plaatsen weer te geven en de AsyncData-component om om te gaan met asynchrone gegevens, 
// zoals laden en fouten. De component bevat een kop (h1) met de tekst "Places" en geeft de plaatsgegevens weer in de PlacesCards-component. 
// De gebruiker krijgt feedback over het laden van gegevens en eventuele fouten tijdens het ophalen, opslaan of verwijderen van plaatsen.
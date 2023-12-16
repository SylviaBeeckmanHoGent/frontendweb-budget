// Importeer de Place-component vanuit het opgegeven bestand
import Place from './Place';

// Functionele React-component PlacesCards
const PlacesCards = ({
  places, // Een array van plaatsobjecten die moeten worden weergegeven
  onRate, // Een functie om de beoordeling van een plaats bij te werken
  onDelete, // Een functie om een plaats te verwijderen
}) => {
  // Render een grid met plaatskaarten, gesorteerd op naam en georganiseerd in kolommen
  return (
    <div className='grid mt-3'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3'>
        {/* Sorteer de plaatsen op naam en map elke plaats naar een Place-component */}
        {places
          .sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase()),
          )
          .map((p) => (
            <div className='col' key={p.id}>
              {/* Gebruik de Place-component voor elke plaats, doorgeven van gegevens en callbackfuncties */}
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

// Exporteer de PlacesCards-component
export default PlacesCards;


// De PlacesCards-component ontvangt een array van plaatsobjecten, evenals functies (onRate en onDelete) om de beoordeling van een plaats bij te werken en 
// een plaats te verwijderen. De plaatsen worden gesorteerd op naam en vervolgens in een grid gerenderd met behulp van de Bootstrap-gridklassen. 
// Voor elke plaats in de gesorteerde lijst wordt een Place-component weergegeven, waarbij de plaatsgegevens worden doorgegeven samen met de callbackfuncties. 
// Dit resulteert in een overzicht van plaatskaarten in een gestructureerde lay-out.
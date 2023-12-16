// Importeer React-hooks en -componenten
import { useParams } from 'react-router-dom'; // useParams-hook voor het ophalen van parameters uit de URL
import useSWR from 'swr'; // useSWR-hook voor het ophalen van data via SWR
import { getById, getAll } from '../../api'; // Importeer API-functies voor het ophalen van specifieke en alle transacties
import TransactionForm from '../../components/transactions/TransactionForm'; // Importeer de TransactionForm-component
import AsyncData from '../../components/AsyncData'; // Importeer de AsyncData-component voor het omgaan met asynchrone gegevens

// Hoofdcomponent AddOrEditTransaction
export default function AddOrEditTransaction() {
  // Haal de 'id'-parameter op uit de URL
  const { id } = useParams();

  // Gebruik de useSWR-hook om transactiegegevens op te halen op basis van de 'id'
  const {
    data: transaction, // De opgehaalde transactiegegevens
    error: transactionError, // Fout tijdens het ophalen van transactiegegevens
    isLoading: transactionLoading, // Geeft aan of transactiegegevens aan het laden zijn
  } = useSWR(id ? `transactions/${id}` : null, getById); // Haal specifieke transactiegegevens op als 'id' bestaat, anders null

  // Gebruik de useSWR-hook om alle plaatsen op te halen
  const {
    data: places = [], // De opgehaalde plaatsgegevens (standaard lege array)
    error: placesError, // Fout tijdens het ophalen van plaatsgegevens
    isLoading: placesLoading, // Geeft aan of plaatsgegevens aan het laden zijn
  } = useSWR('places', getAll); // Haal alle plaatsen op

  // Render de component
  return (
    <>
      <h1>
        Add transaction
      </h1>

      {/* Render de AsyncData-component voor het omgaan met asynchrone gegevens */}
      <AsyncData
        error={transactionError || placesError}
        loading={transactionLoading || placesLoading}
      >
        {/* Render de TransactionForm-component met opgehaalde plaatsen en transactiegegevens */}
        <TransactionForm
          places={places}
          transaction={transaction}
        />
      </AsyncData>
    </>
  );
}


// De AddOrEditTransaction-component wordt gebruikt om een transactie toe te voegen of te bewerken. 
// Het haalt transactiegegevens op en, indien nodig, plaatsgegevens via SWR-hooks. 
// Het gebruikt de TransactionForm-component om de transactie-invoer weer te geven. 
// Het heeft ook functionaliteit voor het omgaan met asynchrone gegevens, zoals laden en foutafhandeling, met behulp van de AsyncData-component.
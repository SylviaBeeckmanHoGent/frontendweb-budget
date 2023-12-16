// Importeer React-hooks en -componenten
import { useState, useMemo } from 'react';
import useSWR from 'swr'; // useSWR-hook voor het ophalen van data via SWR
import { Link } from 'react-router-dom'; // Link-component voor het maken van links
import useSWRMutation from 'swr/mutation'; // useSWRMutation-hook voor het muteren van data via SWR
import { getAll, deleteById } from '../../api'; // Importeer API-functies voor het ophalen en verwijderen van transacties
import AsyncData from '../../components/AsyncData'; // Importeer de AsyncData-component voor het omgaan met asynchrone gegevens
import TransactionsTable from '../../components/transactions/TransactionTable'; // Importeer de TransactionsTable-component
import { useThemeColors } from '../../contexts/Theme.context'; // Importeer de useThemeColors-hook voor het bepalen van themakleuren

// Hoofdcomponent TransactionList
export default function TransactionList() {
  // Haal het thema op uit de Theme-context met behulp van de useThemeColors-hook
  const { theme } = useThemeColors();

  // Stel de lokale state in voor tekst en zoekopdracht
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  // Gebruik de useSWR-hook om transactiegegevens op te halen
  const { data: transactions = [], isLoading, error } = useSWR('transactions', getAll);

  // Gebruik de useSWRMutation-hook om de deleteById-functie te muteren voor transacties
  const { trigger: deleteTransaction, error: deleteError } = useSWRMutation('transactions', deleteById);

  // Gebruik useMemo om de gefilterde transacties op te slaan en te voorkomen dat ze opnieuw worden berekend bij elke render
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        return t.place.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, transactions],
  );

  // Render de component
  return (
    <>
      {/* Render de kop met themakleur en tekst "Transactions" */}
      <h1 className={`text-bg-${theme}`}>Transactions</h1>

      {/* Render een link om een nieuwe transactie toe te voegen */}
      <div className="clearfix">
        <Link to="/transactions/add" className="btn btn-primary float-end">
          Add transaction
        </Link>
      </div>

      {/* Render een zoekveld met knop en gebruik lokale state voor tekst en zoekopdracht */}
      <div className='input-group mb-3 w-50'>
        <input
          type='search'
          id='search'
          className='form-control rounded'
          placeholder='Search'
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-cy="transactions_search_input"
        />
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => setSearch(text)}
          data-cy="transactions_search_btn"
        >
          Search
        </button>
      </div>

      {/* Render de AsyncData-component voor het omgaan met asynchrone gegevens */}
      <div className="mt-4">
        <AsyncData loading={isLoading} error={error || deleteError}>
          {/* Render de TransactionsTable-component met gefilterde transacties en de deleteTransaction-functie */}
          <TransactionsTable transactions={filteredTransactions} onDelete={deleteTransaction} />
        </AsyncData>
      </div>
    </>
  );
}



// De TransactionList-component vertegenwoordigt een lijst met transacties. 
// Het haalt transactiegegevens op, laat de gebruiker nieuwe transacties toevoegen via een link, en biedt zoekfunctionaliteit op basis van plaatsnaam. 
// Het maakt gebruik van verschillende React-hooks en SWR-hooks om gegevens op te halen, te muteren en weer te geven. 
// De component maakt ook gebruik van lokale state voor de zoekopdracht en tekst en geeft feedback over het laden van gegevens en eventuele fouten.
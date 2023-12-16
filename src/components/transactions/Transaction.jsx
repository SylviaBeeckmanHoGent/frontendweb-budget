// Importeer de vereiste React-hooks en -componenten
import { memo, useCallback } from 'react';
import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

// Initialiseer een datum- en bedragopmaak voor de weergave
// kan ook met react-intl (https://formatjs.io/docs/getting-started/installation/)
const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

// Definieer de functionele React-component TransactionMemoized
const TransactionMemoized = memo(function Transaction({ id, user, date, amount, place, onDelete }) {
  // Definieer een geheugenoptimalisatie voor de functie onDelete met behulp van useCallback
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  // Render de transactiegegevens in een tabelrij met datum, gebruiker, plaats, bedrag en actieknoppen
  return (
    <tr data-cy="transaction">
      <td data-cy="transaction_date">
        {dateFormat.format(new Date(date))}
      </td>
      <td data-cy="transaction_user">{user.name}</td>
      <td data-cy="transaction_place">{place.name}</td>
      <td data-cy="transaction_amount">
        {amountFormat.format(amount)}
      </td>
      <td>
        {/* Maak een link naar de bewerkpagina van de transactie */}
        <Link data-cy="transaction_edit_btn" to={`/transactions/edit/${id}`} className="btn btn-light">
          <IoPencilOutline />
        </Link>
        {/* Voeg een knop toe om de transactie te verwijderen met de handleDelete-functie */}
        <button data-cy="transaction_remove_btn" className='btn btn-danger' onClick={handleDelete}>
          <IoTrashOutline />
        </button>
      </td>
    </tr>
  );
});

// Exporteer de gememoïseerde (geoptimaliseerde) versie van de Transaction-component
export default TransactionMemoized;

// De TransactionMemoized-component neemt transactiegegevens als eigenschappen (props) en toont deze in een tabelrij. 
// De component maakt gebruik van memoïzatie om de prestaties te optimaliseren door re-renders te voorkomen als de props niet zijn gewijzigd. 
// Verder wordt er een opmaak toegepast op de datum en het bedrag voor een betere weergave. 
// De knoppen "Bewerken" en "Verwijderen" zijn voorzien van specifieke gegevensattributen voor testdoeleinden (data-cy).
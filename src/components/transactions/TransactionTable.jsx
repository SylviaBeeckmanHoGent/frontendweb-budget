// Importeer de Transaction-component en de useThemeColors hook vanuit de respectievelijke bestanden
import Transaction from './Transaction';
import { useThemeColors } from '../../contexts/Theme.context';

// De hoofdcomponent TransactionTable
export default function TransactionTable({
  transactions, // Een array van transactieobjecten die moeten worden weergegeven
  onDelete, // Een functie om een transactie te verwijderen wanneer dat nodig is
}) {
  // Haal het huidige thema op uit de Theme-context met behulp van de useThemeColors-hook
  const { theme } = useThemeColors();

  // Controleer of er geen transacties zijn en geef een bericht weer als dat het geval is
  if (transactions.length === 0) {
    return (
      <div className='alert alert-info' data-cy="no_transactions_message">
        There are no transactions yet.
      </div>
    );
  }

  // Render de transactietabel met de gegeven transacties en themakleur
  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        {/* Tabelkop met kolomtitels */}
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Place</th>
            <th>Amount</th>
            <th></th> {/* Een lege kolom voor actieknoppen */}
          </tr>
        </thead>
        {/* Tabelinhoud met rijen voor elke transactie */}
        <tbody>
          {transactions.map((transaction) => (
            // Gebruik de Transaction-component voor elke transactie, doorgeven van gegevens en onDelete-functie
            <Transaction
              {...transaction}
              key={transaction.id}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}


// De TransactionTable-component ontvangt een lijst van transacties en een functie om transacties te verwijderen. 
// Als er geen transacties zijn, wordt een informatief bericht weergegeven. 
// Anders wordt een tabel met transacties weergegeven, waarbij elke transactie wordt voorgesteld door de Transaction-component. 
// Het thema van de tabel wordt ingesteld op basis van het huidige thema in de applicatie, verkregen via de useThemeColors-hook.
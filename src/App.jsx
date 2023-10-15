import Transaction from './components/transactions/Transaction';
import { TRANSACTION_DATA } from './api/mock_data';
import PlacesList from './components/places/PlacesList';

/*
COMPONENTS -> starten altijd met een hoofdletter
- PlacesList: lijst van plaatsen
  - Props: geen
  - State: lijst van plaatsen (PlaseList houdt dus zelf zijn lijst van plaatsen bij en krijgt ze niet door via props)
- Place: één plaats
  - Props: attributen van de place (id, name, rating), handler voor het wijzigen van de rating
  - State: geen
- StarRating: rating van een plaats in sterren
  - Props: huidige rating, handler voor het wijzigen van de rating, aantal sterren
  - State: huidige rating (kan aangepast worden)
- Star: één ster (in de rating)
  - Props: index van ster, huidige rating, handler voor het klikken op de ster
  - State: geen
*/

function App() {
  return (
    <div className='App'>
      {
        TRANSACTION_DATA.map((trans, index) => (
          <Transaction key={index} {...trans} />
        ))
      }
      <PlacesList />
    </div>
  );
}

export default App;

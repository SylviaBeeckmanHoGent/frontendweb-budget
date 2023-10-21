import { useState, memo } from 'react';
import { PLACE_DATA } from '../../api/mock_data';
import { useForm } from 'react-hook-form';

const toDateInputString = (date) => {
  // ISO String without the trailing 'Z' is fine 🙄
  // (toISOString returns something like 2020-12-05T14:15:74Z,
  // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
  //
  // the best thing about standards is that we have so many to chose from!
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

export default memo(function TransactionForm({ onSaveTransaction }) {
  // //dit zijn onze statevariabelen voor onze veldjes
  // //de useStates hebben allemaal een startwaarde
  // //als de gebruiker een nieuwe waarde ingeeft, dan roepen we dus de setter aan met de nieuwe waarde
  // const [user, setUser] = useState(''); //statevariabele user; defaultwaarde is lege string
  // const [date, setDate] = useState(new Date()); //statevariabele date; defaultwaarde is huidige datum
  // const [place, setPlace] = useState('home'); //statevariabele place; defaultwaarde is 'home'
  // const [amount, setAmount] = useState(0); //statevariabele amount; defaultwaarde is 0
  
  //bovenstaande doen we weg en we gebruike nu useForm()
  const {
    register, //nieuw  inputveld registreren
    handleSubmit, //helpt u om uw submitfunctie op te bouwen; verzamelt alle waarden van je formulier en geeft die dan door
    reset, //maakt alle velden terug leeg
    formState: { errors }, //errors van de validatie
  } = useForm({
    //defaultwaarden meegeven
    defaultValues: {
      user: '',
      place: 'home',
      amount: 0,
      date: toDateInputString(new Date()),
    }
  });

  const onSubmit = (data) => { //data = alle waarden uit het formulier
    console.log(data); //zodat we kunnen zien wat er in data zit
    const { user, place, amount, date } = data; //destructuring
    // onSaveTransaction(user, place, Number(amount), new Date(date)); //parsen hoeft niet meer want we hebben property valueAsNumber en valueAsDate
    onSaveTransaction(user, place, amount, date);
    reset(); //reset alle velden
  };

  // const handleSubmit = (event) => {
  //   //het standaard gedrag van een formulier is verzenden, dat event willen we voorkomen met preventDefault
  //   event.preventDefault();
  //   //add transaction
  //   onSaveTransaction(user, place, amount, date); //zorg dat de argumenten in de juiste volgorde staan
  //   //nadien alles terug leegmaken
  //   setUser('');
  //   setDate(new Date());
  //   setPlace('home');
  //   setAmount(0);
  // };

  console.log('rendering TransactionForm');
  return (
    <>
      <h2>Add transaction</h2>
      {/* handleSubmit verzamelt alle waarden en geeft die (data) door aan de eigen functie onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>
            Who
          </label>
          <input
            id='user'
            type='text'
            className='form-control'
            placeholder='user'
            // required //verplicht veld
            //onderstaande nodig voor het koppelen van het veldje (hier input) aan de statevariabele (hier user
            // value={user} //de waarde moet gelijk zijn aan de statevariabele
            // onChange={(e) => setUser(e.target.value)} //als er iets wijzigt, roepen we de setter aan > target (hier input) wordt ingesteld met de ingetypte waarde
            defaultValue=''
            {...register('user', {
              required: 'User is required', //string weergeven als het veld niet is ingevuld
              minLength: { value: 2, message: 'Min length is 2'}, //minLength verwacht een object > value = aantal tekens, message = string die weergegeven wordt indien niet in orde
            })} //vangt de onChange en de value op
          />
          {errors.user && <p className='form-text text-danger'>{errors.user.message}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>
            Date

          </label>
          <input
            id='date'
            type='date'
            className='form-control'
            placeholder='date'
            // value={toDateInputString(date)}
            // onChange={(e) => setDate(new Date(e.target.value))} // e.target.value is een string, maar we willen een Date object > dus new Date()
            defaultValue={toDateInputString(new Date())}
            {...register('date', {valueAsDate: true})}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='places' className='form-label'>
            Place
          </label>
          <select
            id='places'
            className='form-select'
            required
            // value={place}
            // onChange={(e) => setPlace(e.target.value)}
            defaultValue='home'
            {...register('place')}
          >
            <option defaultChecked value=''>
              -- Select a place --
            </option>
            {PLACE_DATA.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='amount' className='form-label'>
            Amount
          </label>
          <input
            id='amount'
            type='number'
            className='form-control'
            required
            // value={amount}
            // onChange={(e) => setAmount(e.target.value)}
            defaultValue={0}
            {...register('amount',{valueAsNumber: true})}
          />
        </div>
        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button type='submit' className='btn btn-primary'>
              Add transaction
            </button>
          </div>
        </div>
      </form>
    </>
  );
});

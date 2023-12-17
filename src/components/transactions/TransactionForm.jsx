//een React-formuliercomponent genaamd TransactionForm die wordt gebruikt voor het toevoegen en bewerken van transacties. 

// Importeer React-hooks en -componenten
import { useCallback, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { save } from '../../api'; // Importeer de save-functie vanuit een API-bestand
import Error from '../Error';

// Hulpmethode om een datumobject om te zetten naar een indeling die compatibel is met het input-type 'date'
const toDateInputString = (date) => {
    // ISO String without the trailing 'Z' is fine 🙄
  // (toISOString returns something like 2020-12-05T14:15:74Z,
  // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
  //
  // the best thing about standards is that we have so many to chose from!
  if (!date) return null;
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

// Validatieregels voor het formulier
const validationRules = {
  user: {
    required: 'User is required',
    min: { value: 1, message: 'min 1' },
  },
  date: { required: 'Date is required' },
  place: { required: 'Place is required' },
  amount: {
    valueAsNumber: true,
    required: 'Amount is required',
    min: { value: 1, message: 'min 1' },
    max: { value: 5000, message: 'max 5000' },
  },
};

// Functionele component voor het invoerveld met label
function LabelInput({ label, name, type, validationRules, ...rest }) {
  const {
    register,
    errors,
    isSubmitting,
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        className='form-control'
        {...rest}
      />
      {hasError ? (
        <div className='form-text text-danger' data-cy="label_input_error">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

// Functionele component voor het selectieveld met plaatsen
function PlacesSelect({ name, places, ...rest }) {
  const {
    register,
    errors,
    isSubmitting,
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        Places
      </label>
      <select {...register(name)} id={name} className='form-select' disabled={isSubmitting} {...rest}>
        <option defaultChecked value=''>
          -- Select a place --
        </option>
        {places.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {hasError ? (
        <div className='form-text text-danger' data-cy="places_select_error">{errors[name]}</div>
      ) : null}
    </div>
  );
}

// Hoofdcomponent TransactionForm
export default function TransactionForm({
  places, // Lijst van beschikbare plaatsen voor de selectie
  transaction, // Optionele transactiegegevens voor bewerking
}) {
  const navigate = useNavigate(); // Haal de navigate-functie op uit react-router-dom

  const {
    trigger: saveTransaction, // Gebruik SWR om de save-functie te muteren
    error: saveError,
  } = useSWRMutation('transactions', save); // 'transactions' is de key voor de cache, en save is de save-functie

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    isSubmitting,
  } = useForm(); // Gebruik react-hook-form voor het beheren van formuliergegevens

  // Callbackfunctie bij het indienen van het formulier
  const onSubmit = useCallback(async (data) => {
    const { user, place, amount, date } = data;
    await saveTransaction({
      userId: user,
      placeId: place,
      amount: parseInt(amount),
      date,
      id: transaction?.id,
    });
    navigate('/transactions', { replace: true }); // Navigeer naar de transactiepagina na het opslaan + door replace kunnen we niet terugkeren naar het formulier
  }, [saveTransaction, navigate, transaction?.id]);

  // Effect dat wordt uitgevoerd wanneer de transactie-props veranderen
  useEffect(() => {
    if (
      // Controleer op een niet-leeg object
      transaction &&
      (Object.keys(transaction).length !== 0 ||
        transaction.constructor !== Object)
    ) {
      // Zet de transactiegegevens om naar het juiste formaat voor het formulier
      const dateAsString = toDateInputString(new Date(transaction.date));
      setValue("date", dateAsString);
      setValue("user", transaction.user.id); //wordt dan ingevuld in de form
      setValue("place", transaction.place.id);
      setValue("amount", transaction.amount);
    } else {
      reset(); // Reset het formulier als er geen transactie is
    }
  }, [transaction, setValue, reset]);

  // Render het formulier met invoervelden en knoppen
  return (
    <>
      <h2>Add transaction</h2>
      <Error error={saveError} />

      {/* FormProvider om formulierfuncties en -statussen te delen met ingebedde componenten */}
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        isSubmitting={isSubmitting}
      >
        {/* Het eigenlijke formulier met LabelInput- en PlacesSelect-componenten */}
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
          <LabelInput
            label='User ID'
            name='user'
            type='number'
            validationRules={validationRules.user}
            data-cy="user_input"
          />

          <LabelInput
            label='Date'
            name='date'
            type='date'
            validationRules={validationRules.date}
            data-cy="date_input"
          />

          <PlacesSelect name='place' places={places} data-cy="place_input" />

          <LabelInput
            label='Amount'
            name='amount'
            type='number'
            validationRules={validationRules.amount}
            data-cy="amount_input"
          />

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isSubmitting}
                data-cy="submit_transaction"
              >
                {transaction?.id
                  ? "Save transaction"
                  : "Add transaction"}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}


{/* De TransactionForm-component beheert een formulier voor het toevoegen en bewerken van transacties. 
      Het maakt gebruik van SWR voor de save-mutatie, react-hook-form voor het beheer van formuliergegevens en 
      bevat verschillende subcomponenten voor specifieke invoervelden. */}
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useCallback } from 'react';
import { useAuth } from '../contexts/Auth.context';
import { useNavigate, useLocation } from 'react-router-dom';
import Error from '../components/Error';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  //login ophalen via de useAuth hook
  const { login, error, loading } = useAuth();

  const navigate = useNavigate();
  const { search } = useLocation(); //enkel nodig als we lijn 45 doen ipv QS

  const methods = useForm({
    defaultValues: {
      email: 'thomas.aelbrecht@hogent.be',
      password: '12345678',
    }
  });

  //we halen de reset uit de methods die we terugkrijgen van de useForm (zie lijn 94 TransactionForm)
  //ook handleSubmit halen we eruit
  const { reset, handleSubmit } = methods; 

  const handleCancel = useCallback(() => {
    reset(); //reset aanroepen
  }, [reset]);

  //krijgt object met email en password door > via object destructuring uitpakken
  const handleLogin = useCallback(async ({email, password}) => {
    const loggedIn = await login(email, password);

    //als we aangemeld zijn willen we meteen op de transacties/home pagina komen
    if (loggedIn) {
      const pathname = search ? search.split('=')[1] : '/'; //dit is geen mooie oplossing > gebruik liever package QS
      navigate({
        pathname, // was hiervoor: pathname: '/', //transactions
        replace: true //zorgt ervoor dat ie niet meer kan terugklikken naar het login form
      });
    }
  }, [login, search]); //deze callback is afhankelijk van de login functie //enkel search nodig als we lijn 45 doen ipv QS

  return (
    <FormProvider {...methods}>
      <div className='container'>
        <form
          onSubmit={handleSubmit(handleLogin)} //onSubmit van het formulier instellen
          className='d-flex flex-column'
        >
          <h1>Sign in</h1>

          {/* Foutmelding tonen als we een foutmelding krijgen */}
          {/* de error krijgen we van de Auth.Context.jsx op lijn 33 > via SWRMutation krijgen we die */}
          <Error error={error} />

          <LabelInput
            label='email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />

          <LabelInput
            label='password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading} //knop disablen als we aan het loaden zijn
              >
                Sign in
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={handleCancel} //meegeven van de handleCancel functie aan de onClick prop van de Candel button
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

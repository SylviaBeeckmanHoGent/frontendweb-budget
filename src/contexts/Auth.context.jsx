import {
  createContext, // 👈 1
  useState, // 👈 4
  useCallback, // 👈 6
  useMemo, // 👈 5
  useContext, // 👈 5
  useEffect
} from 'react';
import useSWRMutation from 'swr/mutation'; // 👈 8 - nodig voor de api call
import * as api from '../api'; // 👈 8

//constanten definiëren
const JWT_TOKEN_KEY = 'jwtToken'; // 👈 13 - jwt-token bijhouden
const USER_ID_KEY = 'userId'; // 👈 13 - userId bijhouden
const AuthContext = createContext(); // 👈 1 - we maken een AuthContext aan

export const useAuth = () => useContext(AuthContext); // 👈 5 - useContext hook die de waarde van de AuthContext teruggeeft

// 👇 2 - AuthProvider krijgt altijd de children die onder hem zitten mee als props
export const AuthProvider = ({ children }) => {
  //statevariabele aanmaken en standaard steken we er de token in die in onze local storage zit
  //als er niks inzit zal de waarde undefined zijn
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY)); // 👈 4 en 13
  const [user, setUser] = useState(null); // 👈 4 - user houden we ook bij, standaard op null
  const [ready, setReady] = useState(false); //statevariabele die aangeeft of de provider ready is of niet
  const [isAuthed, setIsAuthed] = useState(false); //statevariabele die aangeeft of je bent aangemeld of niet > als je een token hebt, ben je aangemeld
  //je zou nog kunnen checken of de token vervallen is

  //als de token in de AuthContext wijzigen, moeten we deze gaan instellen
  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token)); //mooiere vorm van !!token > heeft token een waarde, dan zal het true opleveren
    setReady(true);
  }, [token]);

  const {
    isMutating: loading,
    error,
    trigger: doLogin, //dit is de functie die we effectief gaan aanroepen om in te loggen
  } = useSWRMutation('users/login', api.post); // 👈 8 - api call naar users/login en gebruik hiervoor de post uit de api

  // 👇 6 - login functie aanmaken via useCallback
  const login = useCallback(
    //async functie die email en wachtwoord meekrijgt waarmee we willen aanmelden
    //moet een boolean teruggeven die zegt of je bent aangemeld of niet
    async (email, password) => {
      try {
        // 👇 7 - token en user krijgen we terug van de api
        const { token, user } = await doLogin({ email, password }); //we geven email en wachtwoord door aan de doLogin functie

        setToken(token); // 👈 8 - stellen token in in de state
        setUser(user); // 👈 8 - stellen user in in de state

        localStorage.setItem(JWT_TOKEN_KEY, token); // 👈 13 - token instellen in de local storage
        localStorage.setItem(USER_ID_KEY, user.id); // 👈 13 - userId instellen in de local storage

        return true; // 👈 10 - geeft true terug indien aangemeld
        // 👇 10
      } catch (error) {
        console.error(error); //foutmelding loggen
        return false; //geeft false terug indien niet aangemeld
      }
    },
    [doLogin] //de login functie is enkel afhankelijk van de doLogin methode
  );

  // 👇 11 - logout functie voorzien die ook gebruikmaakt van useCallback
  //die is niet async
  const logout = useCallback(() => {
    //statevariabelen leegmaken
    setToken(null);
    setUser(null);

    //localstorage leegmaken
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []); //heeft geen dependencies

  // 👇 5 en 9 en 12
  //useMemo ontvangt een functie en maakt een object (vandaar de () errond)
  const value = useMemo(
    () => ({
      token,
      user,
      error,
      loading,
      ready,
      isAuthed,
      login,
      logout,
    }),
    [token, user, error, loading, ready, isAuthed, login, logout] //afhankelijk van alles > want deze worden allemaal op de context gezet
  );

  // 👇 3 - alle kinderen onder de provider zitten gaan aan de value kunnen
  //we geven de value door een de value prop
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

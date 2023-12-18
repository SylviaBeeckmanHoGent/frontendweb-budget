import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";

//heeft als taak een loading state te tonen als de AuthProvider nog niet klaar is
//aangemeld? dan gaan we door
//niet aangemeld? dan gaan we naar login
export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation(); //huidige url ophalen

  const loginPath = `/login?redirect=${pathname}`; // /login?redirect=/places > als we zijn aangemeld, dan moeten we terugkeren naar places en niet de gewone /

  //als de AuthContext niet klaar is, dan tonen we de loading > want we moeten de user gegevens ophalen en eventueel de token expires checken
  if (!ready) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Loading...</h1>
            <p>Please wait while we are checking your credentials and loading the application.</p>
          </div>
        </div>
      </div>
    );
  }

  //als we aangemeld zijn, gaan we het juiste component tonen
  if (isAuthed) {
    return <Outlet />;
  }

  //de AuthContext is ready en we zijn niet aangemeld, dan worden we omgeleid met de Navigate naar het loginPath
  return <Navigate replace to={loginPath} />
}
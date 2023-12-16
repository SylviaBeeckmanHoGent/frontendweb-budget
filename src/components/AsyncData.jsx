import Loader from "./Loader";
import Error from "./Error";

//functie krijgt loadingstate mee, error en eventuele kinderen
export default function AsyncData({ 
  loading, //loading of niet
  error, //foutmelding
  children //wat er getoond wordt indien de reponse OK is
}) {
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return (
      <>
        <Error error={error}/>
        {children}
      </>
    )
  }
}
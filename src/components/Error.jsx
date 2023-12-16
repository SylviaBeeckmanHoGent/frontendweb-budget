import { isAxiosError } from 'axios';

export default function Error({ error }) { // 👈 1 - krijgt een error binnen als prop
  if (isAxiosError(error)) { // 👈 2 - gaat kijken of het een Axios fout is
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Oops, something went wrong</h4>
        <p>
          {/* 👇 3 */}
          {error.response?.data?.message || error.message}
          {error.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </div>
    );
  }

  // 👇 4 - indien geen Axios fout
  if (error) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null; // 👈 5 - indien geen foutmelding geven we null terug, dus wordt niet getoond
}

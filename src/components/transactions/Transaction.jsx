import { memo } from "react";

//memo gaat kijken naar de props van de component: zijn ze niet gewijzigd tov de vorige render, dan wordt de component niet opnieuw gerenderd
export default memo(function Transaction({ user, amount, place }) {
  console.log('rendering Transaction');
  return (
    <div className='text-bg-dark' style={{ textAlign: 'center' }}>
      {user} gaf €{amount} uit bij {place}
    </div>
  );
});

import { memo } from "react";

//memo gaat kijken naar de props van de component: zijn ze niet gewijzigd tov de vorige render, dan wordt de component niet opnieuw gerenderd
export default memo(function Transaction({ date, user, amount, place }) {
  console.log('rendering Transaction');
  return (
    <tr>
      <td>{date}</td>
      <td>{user.name}</td>
      <td>{place.name}</td>
      <td>{amount}</td>
      <td></td>
    </tr>
  );
});

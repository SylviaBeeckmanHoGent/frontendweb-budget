import { IoStarSharp } from "react-icons/io5";

const Star = ({
  index,
  selected = false, //selected = true kan je verkort schrijven als selected
  onSelect = (f) => f, // onSelect = (f) => f is een dummy functie, die niets doet; (f) => f is default, is niet verplicht; deze onSelect hebben we zelf gemaakt
}) => {
  const handleClick = () => {
    onSelect(index + 1); // index+1 omdat de index van een array begint bij 0
    console.log("Star clicked");
  };

  return (
    <IoStarSharp
      color={selected ? "yellow" : "grey"}
      onClick={handleClick}
    />
  );
}

export default function StarRating({
  numberOfTotalStars = 5, // default waarde van 5 sterren
  selectedStars = 0,
  onRate,
}) {
  return (
    <>
      {/* {new Array(5).fill(<Star key={index} />)} > dit werkt niet; het probleem is dat je de key niet kan instellen bij de Star */}
      {/* We moeten dus een spread operator gebruiken, bij de map-functie wordt star voorgesteld maar die hebben we niet, dus gebruiken we underscore */}
      {/* De key mag hier index zijn, want de sterren veranderen nooit van plaats */}
      {[...new Array(numberOfTotalStars)].map((_, index) => (
        <Star
          selected={selectedStars > index}
          key={index}
          index={index} // index van de ster moet je ook meegeven, anders krijg je NaN als je klikt op de ster
          onSelect={onRate}
        />
      ))}
      <p>
        {selectedStars} of {numberOfTotalStars} stars
      </p>
    </>
  )
}
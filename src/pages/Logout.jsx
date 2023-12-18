import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";
import { useThemeColors } from "../contexts/Theme.context";

export default function Logout() {
  const { theme, oppositeTheme } = useThemeColors();
  const { isAuthed, logout } = useAuth();

  //iets doen vanaf uw component er is, is met useEffect
  useEffect(() => logout(), [logout]); //logout moeten we meegeven als dependency, doet eigenlijk niks want we gebruiken useMeme in de Auth hiervoor

  
  return (
    <div className={`container bg-${theme} text-${oppositeTheme}`}>
      <div className="row">
        <div className="col-12">
          <h1>
            {/* terwijl we nog aangemeld zijn, tonen we Logging out, anders het andere*/}
            {isAuthed ? "Logging out" : "You were succesfully logged out"} 
          </h1>
        </div>
      </div>
    </div>
  )
}
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

//het ThemeContext is het object dat je krijgt van React en dat bevat uw provider voor uw contextwaarde
//uw provider is diegene die de waarde die in uw context zit gaat gaan aanbieden, 
//dit is diegene die gaat zeggen dit is de state van uwe context
//die waarde geef je mee via value
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext); //custom hook > gaat de waarde van de context gaan ophalen 

//handig voor componenten die enkel theme en oppositeTheme als kleur nodig hebben
export const useThemeColors = () => {
  const { theme, oppositeTheme } = useTheme();
  return { theme, oppositeTheme };
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(sessionStorage.getItem('themeMode') || themes.dark); //dark is de default theme indien in de sessionStorage niets zit

  //deze functie gaat de theme veranderen
  const toggleTheme = useCallback(() => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark; //nieuwe theme instellen > dark? dan wordt het light, en anders wordt het dark indien light
    setTheme(newTheme); //we stellen de nieuwe theme in
    sessionStorage.setItem('themeMode', newTheme); //we houden de theme bij in de sessionStorage
  }, [theme]); //deze functie is afhankelijk van de theme > moet dus enkel opnieuw uitgevoerd worden als de theme verandert


  const value = useMemo(() => ({ 
    theme, //enkel opnieuw renderen als de theme verandert, dus useMemo gebruiken
    oppositeTheme: theme === themes.dark ? themes.light : themes.dark,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    // pas je het aan naar light, dan krijg je een light theme
    <ThemeContext.Provider value={ value }>
      {children} {/*alles wat tussen de provider staat, zijn de kinderen van de provider > TransactionList en PlacesList*/}
    </ThemeContext.Provider>
  )
}
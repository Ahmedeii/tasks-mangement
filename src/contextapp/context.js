import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();

const initialData = { theme:localStorage.getItem("mood")==="null"? "light":localStorage.getItem("mood")};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }}
export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changetheme = (newtheme) => {
    localStorage.setItem("mood",newtheme)
    dispatch({ type: "CHANGE_THEME", newValue: newtheme });
  };
  return (
     <ThemeContexttt.Provider value={{ ...firstState,changetheme,}}>
      {children}
     </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt
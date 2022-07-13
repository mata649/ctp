import { createContext, useState } from "react";
import LoadingOverlay from "react-loading-overlay";

export const AppContext = createContext();







export const AppProvider = ({ children }) => {
  
  const [loading, setLoading] = useState(false);
  
  return (
    <AppContext.Provider value={{ setLoading }}>
       
       {loading?
        <h1>Cargando</h1>:
        {children}
       } 
    
    </AppContext.Provider>
  );
};



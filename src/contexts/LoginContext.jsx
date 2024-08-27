import { createContext, useState } from 'react'
export const LoginContext = createContext();

export const LoginStatusProvider = ({children}) => {
  const [existedUser, setExistedUser] = useState([]);

  return (
    <LoginContext.Provider value={{existedUser, setExistedUser}} >
        {children}
    </LoginContext.Provider>
  )
}


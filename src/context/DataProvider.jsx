import React, { createContext, useEffect, useState } from 'react'

export const DataContext= createContext(null);
const DataProvider = ({children}) => {
    const [account, setAccount]=useState('');
    const firstname=localStorage.getItem('firstname');
    const username= localStorage.getItem('username');
    useEffect(()=>{
      setAccount(username ? username : firstname);
    }, [username, firstname]);
  return (
    <DataContext.Provider value={{
        account,
        setAccount
    }}>
{children}
    </DataContext.Provider>
  )
}

export default DataProvider;
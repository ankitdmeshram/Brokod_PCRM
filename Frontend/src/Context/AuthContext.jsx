import React, { createContext, useEffect, useState } from 'react'
// import { getCookie } from '../Utils/common'

export const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [name, setName] = useState('Ankit ')

    const contextValue = {
        name,
        setName
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
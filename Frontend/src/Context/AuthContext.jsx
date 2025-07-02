import React, { createContext, useEffect, useState } from 'react'
import { getCookie } from '../Utils/Common';

export const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    const contextValue = {
        userData,
        setUserData
    }

    useEffect(() => {
        cookieUserData()
    }, []);

    const cookieUserData = async () => {

        const userDataCookie = await getCookie('udd');
        if (userDataCookie) {
            try {
                setUserData(JSON.parse(userDataCookie));
                if (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/signup') {
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                console.error("Error parsing user data from cookie:", error);
            }
        } else {
            console.log("No user data found in cookies");
            setUserData(null);
            if (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/signup') {
                return;
            }
            window.location.href = '/';
        }
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
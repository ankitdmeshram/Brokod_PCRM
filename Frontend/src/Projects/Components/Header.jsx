import React, { useContext } from 'react'
import { Box } from "@mui/joy"
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AuthContext'
import { LOGOUT } from '../../Services/api_services'

const Header = () => {

    const { userData } = useContext(AppContext)

    const isLoggedIn = userData && Object.keys(userData).length > 0 ? "protected" : "public"

    const URLS = [
        { name: 'Dashboard', path: '/dashboard', type: 'protected' },
        { name: 'Sign In', path: '/signin', type: 'public' },
        { name: 'Sign Up', path: '/signup', type: 'public' },
        { name: 'Logout', type: 'protected', function: LOGOUT }
    ]

    return (
        <Box sx={Styles.header}>
            <Box sx={Styles.title}>PCRM</Box>
            <Box sx={Styles.navLinks}>
                {URLS.map((url, index) => (
                    isLoggedIn == url?.type && < Link key={index} style={Styles?.link} to={url.path} onClick={() => url?.function && url.function()}>
                        {url.name}
                    </Link>
                ))}
            </Box>
        </Box >
    )
}

export default Header

const Styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '1.5rem',
    },
    navLinks: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        fontSize: '1rem',
    }
}
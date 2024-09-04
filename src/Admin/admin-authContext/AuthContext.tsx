import { ReactNode, createContext, useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext( { user: '', logoutUser: () => {}, loginUser: () => {} } );
const AUTH_TOKEN  = process.env.backend_auth_url;

export const AuthProvider = ({ children } : { children: ReactNode }) => {

    let [user, setUser] = useState(() => (sessionStorage.getItem('authTokens') ? jwtDecode(sessionStorage.getItem('authTokens') ?? '') : null))
    let [authTokens, setAuthTokens] = useState(() => (sessionStorage.getItem('authTokens') ? JSON.parse(sessionStorage.getItem('authTokens') ?? '') : null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    
    //Login User - post request to submits form 
    let loginUser = async (e: React.FormEvent<EventTarget>) => {
        let target = e.target as HTMLInputElement;

        e.preventDefault()
        console.log('form submitted')
        const response = await fetch( AUTH_TOKEN + "token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: target.username.value, password: target.password.value })
    
        });

        let data = await response.json();
        // console.log('data:', data) 
        //logs JWT tokens if login is successful
        // With wrong credentials the code get stuck with parsing error message
        // because the response has text message not the access and request tocken in required format
        // performing a check on success of login will prevent this error.
        

        if(data && response.ok){
            sessionStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/admin-layout')
        } else {
            alert('Login Failed!')
        }
    }

    //Logout user
    let logoutUser = () => {
        // e.preventDefault()
        sessionStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    //Updates and refreshes tokens
    const updateToken = async () => {
        const response = await fetch( AUTH_TOKEN + 'token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })
       
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            sessionStorage.setItem('authTokens',JSON.stringify(data))
        }
        //  else {
        //     logoutUser()
        // }

        if(loading){
            setLoading(false)
        }
    }

    //User form data 
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    
    useEffect(()=>{
        if(loading){
            updateToken()
        }
        const REFRESH_INTERVAL = 1000 * 60 * 5 // refreshes token every 5 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)
    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
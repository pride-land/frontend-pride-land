import { ReactNode, createContext, useState, useEffect, useContext } from 'react'
import * as jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
    user: jwt.JwtPayload | null;
    authTokens: any; 
    loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined >(undefined);
const AUTH_TOKEN  = process.env.backend_auth_url;
    
export const AuthProvider = ({ children } : { children: ReactNode }) => {

    let [user, setUser] = useState(() => (sessionStorage.getItem('authTokens') ? jwt.jwtDecode(sessionStorage.getItem('authTokens') ?? '') : null))
    let [authTokens, setAuthTokens] = useState(() => (sessionStorage.getItem('authTokens') ? JSON.parse(sessionStorage.getItem('authTokens') ?? '') : null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    
    //Login User - post request to submits form 
    // let loginUser = async (e: React.FormEvent<EventTarget>) => {
    //     let target = e.target as HTMLInputElement;

    //     e.preventDefault()
    //     const response = await fetch( AUTH_TOKEN + "token/", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({username: target.username.value, password: target.password.value })
    
    //     }); 
    
    // the above is the original code. It had type issues. I fixed it below. Maybe?

    let loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const form = e.currentTarget; // Get the form element
        const formData = new FormData(form); // Extract form data
    
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
    
        
        const response = await fetch(AUTH_TOKEN + "token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Use form data for the body
        });

        let data = await response.json();
        // With wrong credentials the code get stuck with parsing error message
        // because the response has text message not the access and request tocken in required format
        // performing a check on success of login will prevent this error.
        

        if(data && response.ok){
            sessionStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwt.jwtDecode(data.access))
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
            setUser(jwt.jwtDecode(data.access))
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
    let contextData: AuthContextType = {
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


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
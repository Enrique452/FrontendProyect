 
import {  createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";

import Cookies from 'js-cookie';
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth deve estar definido en un contexto')
    }
    return context;
}

export const AuthProvider = ({children}) =>{
     
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async (user)=> {
       try {
        const res = await registerRequest(user);
        //console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
        
       } catch (error) {
        console.log(error.response.data.message);
        
        setErrors(error.response.data.message);
       }
    }
    const signin = async(user) =>{
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error)
            setErrors(error.response.data.message);
        }
    }

    //funcion para cerrar sesion 
    const logout = () =>{
        logoutRequest();
        Cookies.remove('token');
            setIsAuthenticated(false);
            setUser(null)
        
    }
    useEffect( ()=>{
        if(errors.length > 0){
            const timer = setTimeout( ()=>{
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect( ()=>{
        async function checkLogin(){
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false),
                setLoading(false);
                setUser(null);
                
            }
        }
        checkLogin();
    }, []);

    return(
        <AuthContext.Provider value={ {
            signup,
            signin,
            user,
            isAuthenticated,
            errors, 
            loading,
            logout
        } } >
            {children}
        </AuthContext.Provider>
    )
}



AuthProvider.propTypes ={
    children: PropTypes.any
}
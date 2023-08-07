import React from 'react'
import { useEffect } from 'react'
import {useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate= useNavigate();
    const[cookies, setCookies]= useCookies(["access_token"])
    useEffect(()=>{

        const verify = async()=>{
            try {
                const response = verify()
                console.log(response)
            } catch (error) {
                console.log('error while verifying')
                
            }
        }
        verify()
    },[])

    const logout =()=>{
        localStorage.clear("userID")
        localStorage.clear("email")
        setCookies("access_token",null)
        navigate('/Login')
        toast.success("logged out succesfully")
        console.log("done")
    }
  return (
    <div>
    <div>nohting.</div>
    <button className="btn btn-primary" onClick={logout}>Logout</button>
    </div>
    
  )
}

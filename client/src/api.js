import axios from "axios"
axios.defaultsWithCredentials=true;
const URL="http://localhost:8000"
export const SignupUser=async (data)=>{

    try {
        
        return await axios.post(`${URL}/auth/add`,data)
        
    } catch (error) {
        console.log(error,"error while calling Signup api")
    }
}



export const loginUser=async (data)=>{

    try {
        
        return await axios.post(`${URL}/auth`,data)
        
    } catch (error) {
        console.log(error,"error while calling Login api")
    }
}
export const verify =async()=>{
    try {
        return await axios.get(`${URL}/auth/verify`)
        
    } catch (error) {
        console.log(error,"error while verifying")
    }
}

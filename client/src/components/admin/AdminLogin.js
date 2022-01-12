import React,{useState,useEffect} from 'react'
import axios from "axios"

import { useNavigate } from "react-router-dom";
import ErrorMessage from '../ErrorMessage';





const AdminLogin = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    let navigate = useNavigate();



    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo")
 
        
        if(adminInfo){
                    navigate('/admin')
        }else{
            navigate("/Adminlogin")
        }
       
    }, [navigate])



    const adSubmitHandle = async (e) => {
        e.preventDefault()
    
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
    
            const { data } = await axios.post("/api/admin/adminlogin", {
                email,
                password,
            }, config)
            console.log(data);
            localStorage.setItem("adminInfo", JSON.stringify(data))
            if (localStorage.adminInfo) {
                navigate('/admin')
            }
    
    
        } catch (error) {
            setError("Invalid Login")
        }
    }










    return (

        <div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <form onSubmit={adSubmitHandle}>

                <h3>Admin Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} placeholder="Enter password"  onChange={(e) => setPassword(e.target.value)} />
                </div>

               <br/>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
              
            </form>
            </div>
    )
}

export default AdminLogin

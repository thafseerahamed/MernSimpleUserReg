import React,{useState,useEffect} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function AdminRegister() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate=useNavigate()

    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo")
 
        
        if(adminInfo){
                    navigate('/adminregister')
        }else{
            navigate("/Adminlogin")
        }
       
    }, [navigate])




const submitHandler =async (e)=>{
    e.preventDefault()
    try {
        const config ={
            headers: {
                "Content-type":"application/json",
            },
        };
      
        const {data} =await axios.post("/api/admin/adminregister",{
            name,
            email,
            password,
        },config)
        console.log(data);
      
        navigate('/adminlogin')
    }
    catch(error){
        console.log(error.response.data.message);
    }


       
}
 
        return (
            <form onSubmit={submitHandler}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="name" value={name} className="form-control" placeholder="First name" onChange={(e)=>{setName(e.target.value)}} />
                </div>

               

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={email} className="form-control" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"name="password" value={password} className="form-control" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
<br/>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
               
            </form>
        )
    }
export default AdminRegister
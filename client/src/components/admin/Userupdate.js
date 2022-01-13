import React ,{useEffect, useState} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

const Userupdate = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const navigate=useNavigate()
    const id1 =useParams()




    useEffect(() => {
      const getUser = async () =>{
          const {data} = await axios.get(`/api/admin/edit/${id1.id}`)
          setEmail(data.email)
          setName(data.name)
      }
     getUser()
    }, [])
    
    const submitHandling =async (e)=>{
        e.preventDefault()
        
        try {
            const config ={
                headers: {
                    "Content-type":"application/json",
                },
            }
          
            await axios.patch(`/api/admin/edit/${id1.id}`,{
           name,
           email
               
            },config)
        
          navigate('/admin')
        }

            catch(error){
                console.log(error.response.data.message);
                
            }
        
        
               
        }




    return (
        <div>
            <form onSubmit={submitHandling}>

                <h3>Edit User</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} name='password' onChange={(e) => setName(e.target.value)} placeholder="Enter password" />
                </div>


                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>

              
                <br />

                <button type="submit" className="btn btn-dark btn-lg btn-block">Update</button>

            

            </form>
        </div>
    )
}

export default Userupdate

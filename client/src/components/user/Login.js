import React, {  useState } from "react";
import axios from "axios"
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";




function Login() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    let navigate = useNavigate();






    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            const { data } = await axios.post("/api/users/login", {
                email,
                password,
            }, config)
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data))
            if (localStorage.userInfo) {
                navigate('/')
            }


        } catch (error) {
            setError("Invalid Login")
        }
    }


    return (
        <div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <form onSubmit={submitHandler}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>

                <br />

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>

                <p className="forgot-password text-right">
                    Not Registered? <a href="" onClick={()=>{navigate("/register")}}>Register</a>
                </p>

            </form>
        </div>
    )

}


export default Login
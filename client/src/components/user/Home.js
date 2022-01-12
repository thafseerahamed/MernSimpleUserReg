import React ,{useEffect,useState} from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";





const Home = () => {
    const [name, setName] = useState("user")
    let navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        const info = JSON.parse(userInfo)
        setName(info ? info.name:"user")
        if(userInfo){
                    navigate('/')
        }else{
            navigate("/login")
        }
       
    }, [navigate])
    return (
      
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ShopIT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title ={name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>{
                                    localStorage.removeItem('userInfo')
                                 
                                    navigate('/login')
                                }}>Logout</NavDropdown.Item>


                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1>Welcome {name}</h1>
        </div>
    )
}

export default Home

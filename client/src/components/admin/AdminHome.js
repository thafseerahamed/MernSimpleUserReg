import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Table, Container, Button, label, Form, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [search, setSearch] = useState('');
    const [arr, setArr] = useState([])
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()
    useEffect(async () => {
        const adminInfo = localStorage.getItem("adminInfo")

        if (adminInfo) {

            try {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }

                const { data } = await axios.get("/api/admin", {

                }, config)
                setArr(data)
            }

            catch (error) {
                throw new error(error.response.data.message)
            }


        } else {

            navigate('/adminlogin')
        }
    }, [refresh])

    const clickHandler = async (id) => {
        if (window.confirm(`Sure to Delete?`)){

            try {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                await axios.delete(`/api/admin/delete/${id}`, {

                }, config)
              

                setRefresh(!refresh)
            }

            catch (error) {
                throw new error(error.response.data.message)
            }

    }}
    const editHandle = (id) => {
        navigate(`/edit/${id}`)
    }

    const searchHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const { data } = await axios.post('/api/admin', {
                search
            }, config)
            console.log(data);
            setArr(data)
        } catch (error) {

        }
    }
    const backtoAdmin = () => {
        setRefresh(!refresh)
        navigate("/Admin")
    }



    return (

        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={backtoAdmin}>ShopIT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="#link" onClick={() => {
                                localStorage.removeItem('adminInfo')

                                navigate('/adminlogin')
                            }}>Log out</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Form onSubmit={searchHandler} className="d-flex">
                        <FormControl
                            type="text" placeholder="Serach by Name" onChange={(e) => setSearch(e.target.value)}
                            className="me-2" value={search} />

                        <button type="submit " variant="ouline-success" className="btn btn-info">Search</button>

                    </Form>


                </Container>
            </Navbar>
            <Button variant="success" onClick={() => navigate('/adminregister')}>Add new admin</Button>

            <Table striped bordered hover >
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>

                    {arr.map((e) => {


                        return (
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td><Button variant="primary" onClick={() => { editHandle(e._id) }} >Edit</Button> <Button variant="danger" onClick={() => { clickHandler(e._id) }}>Delete</Button> </td>

                            </tr>
                        )
                    })}




                </tbody>
            </Table>









        </div>

    )

}

export default AdminHome

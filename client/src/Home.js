import ClientNavbar from "./ClientNavbar";
import {Button, Container} from "reactstrap";
import {Link} from "react-router-dom";
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div>
            <ClientNavbar />
            <Container fluid>
                <Button color="primary"><Link className="hoverbold" to="/books">My Library</Link></Button>
            </Container>
        </div>
    );
}
export default Home;